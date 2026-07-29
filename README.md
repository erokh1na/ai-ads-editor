# AI Ads Editor

Редактор объявлений с серверной фильтрацией, сортировкой и валидацией.

## Стек

| Слой | Технология |
|---|---|
| **Фреймворк** | React 19 |
| **Сборка** | Vite 8 |
| **Язык** | TypeScript 5.9 |
| **Роутинг** | React Router 8 |
| **Серверный стейт** | TanStack React Query 5 |
| **HTTP-клиент** | Axios |
| **UI-кит** | Ant Design 6 |
| **Стили** | SCSS Modules + глобальные SCSS-токены |
| **Бэкенд** | Fastify 5 + Zod 4 |

## Запуск

```bash
npm install          # зависимости фронтенда
npm run dev          # Vite dev-сервер (фронтенд)
npm run dev:server   # Fastify (бэкенд, порт 8080)
```

## Архитектура

### Общий подход — Clean Architecture (Ports & Adapters)

Проект разделён на четыре слоя внутри каждого бизнес-модуля. Зависимости направлены **внутрь**: внешние слои знают о внутренних, но не наоборот.

```
drivers (UI)  →  applications (use cases)  →  domain (entities, ports)
                         ↑
                infrastructure (adapters: API, mapper, DTO)
```

### Структура директорий

```
src/
├── main.tsx                  # Точка входа: QueryClient → BrowserRouter → Routing
├── core/                     # Общая инфраструктура
│   ├── fetcher/              #   Экземпляр Axios (baseURL: localhost:8080)
│   └── store/                #   Redux (зарезервирован, пока не используется)
├── modules/                  # Бизнес-модули
│   └── ads/                  #   Модуль «Объявления»
│       ├── domain/           #     Сущности и порты (чистая логика)
│       │   ├── entities/     #       AppAd — доменная модель объявления
│       │   └── port/         #       Интерфейсы AppAdsListInput / AppAdsListOutput
│       ├── applications/     #     Use cases
│       │   └── usecases/list/#       useAdsList() — композиция запроса и маппинга
│       ├── infrastructure/   #     Адаптеры (реализация портов)
│       │   └── adapters/     #       API-хуки (TanStack Query), key factory, mapper, DTO-типы
│       └── drivers/          #     UI-слой
│           └── features/ads-list/ #  Компонент AdsList
├── routing/                  # Роутинг
│   ├── routing.tsx           #   Дерево маршрутов
│   ├── layouts/layout-main/  #   Layout с сайдбаром (Ant Design Layout + Sider)
│   └── pages/page-home/      #   Тонкая страница — рендерит AdsList
├── server/                   # Бэкенд (отдельный пакет)
│   ├── server.ts             #   Fastify: GET /items, GET /items/:id, PUT /items/:id
│   ├── data/items.json       #   32 статичных объявления
│   └── src/
│       ├── types.ts          #   Дискриминируемый union Item (auto | real_estate | electronics)
│       ├── validation.ts     #   Zod-схемы валидации query-параметров и тела PUT
│       ├── utils.ts          #   doesItemNeedRevision() — проверка обязательных полей
│       └── constants.ts      #   Категории
└── ui/                       # Глобальные стили
    ├── reset/                #   CSS reset (normalize)
    ├── token/                #   Дизайн-токены (breakpoints, container)
    ├── core/                 #   Миксины (container, rem)
    └── utils/                #   Утилиты (text-ellipsis, sr-only, scroll-bar и др.)
```

### Поток данных

```
[Компонент AdsList]
       ↓
[useAdsList()] — use case, композиция
       ↓
[adsApiClient.useList()] — TanStack Query-хук
       ↓
[fetcherClient.get("/items")] — Axios → HTTP GET :8080/items
       ↓
[Fastify] — фильтрация, сортировка, пагинация → ServerAdsListResponse
       ↓
[toDomainAdsList()] — mapper: DTO → доменная модель
       ↓
[AppAdsListOutput { data: AppAd[], meta: { total } }]
       ↓
[AdsList] — рендеринг
```

### Доменная модель vs DTO

Сервер возвращает категории в «сыром» виде: `auto`, `real_estate`, `electronics`.  
Mapper (`infrastructure/adapters/mapper.ts`) преобразует их в доменные: `auto`, `realty`, `electro`.

```ts
// Доменная модель (domain/entities/model.ts)
interface AppAd {
  id: string
  title: string
  description?: string
  price: number
  category: "auto" | "electro" | "realty"
  needsRevision: boolean
}

// Серверный DTO (infrastructure/adapters/types.ts)
interface ServerAd {
  title: string
  price: number | null
  category: "auto" | "electronics" | "real_estate"
  needsRevision: boolean
}
```

### Ключи кеша (Key Factory)

```ts
adsApiKeys.all           → ["ads"]
adsApiKeys.lists()       → ["ads", "ads"]
adsApiKeys.list(input)   → ["ads", "ads", { … }]
```

Иерархическая структура позволяет точечно инвалидировать кеш: например, после мутации одного элемента сбросить `lists()`, не трогая `all`.

### API сервера

| Метод | Путь | Параметры | Описание |
|---|---|---|---|
| `GET` | `/items` | `q`, `categories`, `needsRevision`, `sortColumn`, `sortDirection`, `skip`, `limit` | Список с фильтрацией и пагинацией |
| `GET` | `/items/:id` | — | Одно объявление |
| `PUT` | `/items/:id` | `title`, `description`, `price`, `params` (зависит от категории) | Обновление с Zod-валидацией |

Все ответы сервера идут с искуственной задержкой 300–1000 мс для тестирования loading-состояний на клиенте.

### Валидация на сервере

Zod-схемы с **дискриминируемым union** по полю `category`. Для каждой категории — свой набор обязательных `params`:

- **auto**: `brand`, `model`, `yearOfManufacture`, `transmission`, `mileage`, `enginePower`
- **real_estate**: `type`, `address`, `area`, `floor`
- **electronics**: `type`, `brand`, `model`, `condition`, `color`

Объявление требует ревизии (`needsRevision = true`), если:
- Отсутствует `description`, **или**
- `params` не проходят Zod-валидацию для своей категории

### Роутинг

```
<BrowserRouter>
  <Routes>
    <Route element={<LayoutMain />}>       ← сайдбар + <Outlet />
      <Route path="/" element={<PageHome />} />   ← рендерит <AdsList />
    </Route>
  </Routes>
</BrowserRouter>
```

`LayoutMain` — Ant Design `Layout` с `Sider` (250px, навигационное меню) и `Content`. `PageHome` — тонкая страница без бизнес-логики.

### Состояние

- **Серверный стейт** — TanStack React Query (запросы, кеширование, ревалидация).
- **Клиентский стейт** — зарезервирован Redux Toolkit (`core/store/`), пока не используется.

### Условные обозначения

- Каждая директория содержит `index.ts` (barrel-экспорт всего публичного API слоя).
- SCSS-модули для компонентов (`*.module.scss`), глобальные стили — через `@forward` в `ui/styles.scss`.
- Алиас `@` → `/src` (настроен в `vite.config.ts` и `tsconfig.app.json`).

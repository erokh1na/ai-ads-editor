import type { AppAdsCategory, AppAdsCategoryConfig, AppAdsViewMode } from "./model"

export const ADS_BY_VIEW: Record<AppAdsViewMode, number> = {
  grid: 10,
  list: 4,
}

export const AD_CATEGORIES: Record<AppAdsCategory, string> = {
  auto: "Авто",
  electro: "Электроника",
  realty: "Недвижимость",
}

export const AD_CATEGORY_CONFIG: { [C in AppAdsCategory]: AppAdsCategoryConfig<C> } = {
  auto: {
    label: "Авто",
    paramLabels: {
      transmission: "Коробка передач",
      brand: "Бренд",
      model: "Модель",
      yearOfManufacture: "Год выпуска",
      mileage: "Пробег",
      enginePower: "Мощность двигателя",
    },
    valueLabels: { automatic: "Автомат", manual: "Механика" },
  },
  realty: {
    label: "Недвижимость",
    paramLabels: { type: "Тип", address: "Адрес", area: "Площадь", floor: "Этаж" },
    valueLabels: { flat: "Квартира", house: "Дом", room: "Комната" },
  },
  electro: {
    label: "Электроника",
    paramLabels: { type: "Тип", brand: "Бренд", model: "Модель", condition: "Состояние", color: "Цвет" },
    valueLabels: { phone: "Телефон", laptop: "Ноутбук", misc: "Другое", new: "Новое", used: "Б/у" },
  },
}

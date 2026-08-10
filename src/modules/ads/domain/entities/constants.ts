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

export const AD_CATEGORY_CONFIG: Record<AppAdsCategory, AppAdsCategoryConfig> = {
  auto: {
    transmission: {
      label: "Коробка передач",
      options: [
        {
          label: "Автомат",
          value: "automatic",
        },
        {
          label: "Механика",
          value: "manual",
        },
      ],
    },
    brand: {
      label: "Бренд",
    },
    model: {
      label: "Модель",
    },
    yearOfManufacture: {
      label: "Год выпуска",
      numeric: true,
    },
    mileage: {
      label: "Пробег",
      numeric: true,
    },
    enginePower: {
      label: "Мощность двигателя",
      numeric: true,
    },
  },
  realty: {
    type: {
      label: "Тип",
      options: [
        {
          value: "flat",
          label: "Квартира",
        },
        {
          value: "house",
          label: "Дом",
        },
        {
          value: "room",
          label: "Комната",
        },
      ],
    },
    address: {
      label: "Адрес",
    },
    area: {
      label: "Площадь",
      numeric: true,
    },
    floor: {
      label: "Этаж",
      numeric: true,
    },
  },
  electro: {
    type: {
      label: "Тип",
      options: [
        {
          value: "phone",
          label: "Телефон",
        },
        {
          value: "laptop",
          label: "Ноутбук",
        },
        {
          value: "misc",
          label: "Другое",
        },
      ],
    },
    brand: {
      label: "Бренд",
    },
    model: {
      label: "Модель",
    },
    condition: {
      label: "Состояние",
      options: [
        {
          value: "new",
          label: "Новое",
        },
        {
          value: "used",
          label: "Б/у",
        },
      ],
    },
    color: {
      label: "Цвет",
    },
  },
}

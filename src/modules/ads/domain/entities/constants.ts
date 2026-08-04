import { AppAdCategory, AppAdsViewMode } from "@/modules/ads/domain/entities/model"

export const AD_CATEGORIES: Record<AppAdCategory, string> = {
  auto: "Авто",
  electro: "Электроника",
  realty: "Недвижимость",
} as const

export const ADS_BY_VIEW: Record<AppAdsViewMode, number> = {
  grid: 10,
  list: 4,
} as const

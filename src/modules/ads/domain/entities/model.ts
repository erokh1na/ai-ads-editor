import { AD_CATEGORIES } from "@/modules/ads/domain/entities/constants"

export type AppAdCategory = keyof typeof AD_CATEGORIES
export type AppAdsViewMode = "grid" | "list"

export interface AppAd {
  id: string
  title: string
  description?: string
  price: number
  category: AppAdCategory
  needsRevision: true
}

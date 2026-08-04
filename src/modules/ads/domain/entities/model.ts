export type AppAdCategory = "auto" | "electro" | "realty"
export type AppAdsViewMode = "grid" | "list"

export interface AppAd {
  id: string
  title: string
  description?: string
  price: number
  category: AppAdCategory
  needsRevision: true
}

import { AppAd, AppAdsCategory } from "@/modules/ads/domain/entities"

export interface AppAdsListInput {
  search?: string
  limit?: number
  skip?: number
  needsRevision?: AppAd["needsRevision"]
  categories?: AppAdsCategory[]
  sortColumn?: "title" | "createdAt"
  sortDirection?: "asc" | "desc"
}

export interface AppAdInput {
  id: string
}

export interface AppAdsListOutput {
  data: AppAd[]
  meta: {
    total: number
  }
}

export interface AppAdsUpdateParams {
  id: string
  category: AppAdsCategory
  title: string
  price: string
  description?: string
  params: Record<string, string | undefined>
}

export interface AppAdOutput {}

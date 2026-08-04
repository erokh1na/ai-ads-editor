import { AppAd, AppAdCategory } from "@/modules/ads/domain/entities"

export interface AppAdsListInput {
  search?: string
  limit?: number
  needsRevision?: AppAd["needsRevision"]
  categories?: AppAdCategory[]
  sortColumn?: "title" | "createdAt"
  sortDirection?: "asc" | "desc"
}

export interface AppAdsListOutput {
  data: AppAd[]
  meta: {
    total: number
  }
}

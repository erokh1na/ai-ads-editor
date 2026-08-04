export type ServerAdCategory = "auto" | "electronics" | "real_estate"

export interface ServerAd {
  id: number
  title: string
  price: number | null
  category: ServerAdCategory
  needsRevision: true
}

export interface ServerAdsListParams {
  q?: string
  limit?: number
  skip?: number
  needsRevision?: ServerAd["needsRevision"]
  categories?: string
  sortColumn?: "title" | "createdAt"
  sortDirection?: "asc" | "desc"
}

export interface ServerAdsListResponse {
  items: ServerAd[]
  total: number
}

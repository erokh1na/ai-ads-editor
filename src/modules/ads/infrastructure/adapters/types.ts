export interface ServerAd {
  title: string
  price: number | null
  category: "auto" | "electronics" | "real_estate"
  needsRevision: boolean
}

export interface ServerAdsListResponse {
  items: ServerAd[]
  total: number
}

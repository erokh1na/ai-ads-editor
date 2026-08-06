export type ServerAdCategory = "auto" | "electronics" | "real_estate"

export interface ServerAutoParams {
  transmission?: "automatic" | "manual"
  brand?: string
  model?: string
  yearOfManufacture?: number
  mileage?: number
  enginePower?: number
}

export interface ServerRealEstateParams {
  type?: "flat" | "house" | "room"
  address?: string
  area?: number
  floor?: number
}

export interface ServerElectronicsParams {
  type?: "phone" | "laptop" | "misc"
  brand?: string
  model?: string
  condition?: "new" | "used"
  color?: string
}

interface ServerAdBase {
  id: number
  title: string
  price: number | null
  needsRevision: true
  description: string | null
  createdAt: string
  updatedAt: string | null
}

export type ServerAd = ServerAdBase &
  (
    | { category: "auto"; params: ServerAutoParams }
    | { category: "real_estate"; params: ServerRealEstateParams }
    | { category: "electronics"; params: ServerElectronicsParams }
  )

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

export type ServerAdResponse = ServerAd

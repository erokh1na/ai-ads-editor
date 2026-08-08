export type AppAdsCategory = "auto" | "electro" | "realty"
export type AppAdsViewMode = "grid" | "list"
export type AppAdsCondition = "new" | "used"

export interface AppAdsAutoParams {
  transmission?: "automatic" | "manual"
  brand?: string
  model?: string
  yearOfManufacture?: number
  mileage?: number
  enginePower?: number
}

export interface AppAdsRealtyParams {
  type?: "flat" | "house" | "room"
  address?: string
  area?: number
  floor?: number
}

export interface AppAdsElectronicsParams {
  type?: "phone" | "laptop" | "misc"
  brand?: string
  model?: string
  condition?: AppAdsCondition
  color?: string
}

export interface AppAdsParamsMap {
  auto: AppAdsAutoParams
  realty: AppAdsRealtyParams
  electro: AppAdsElectronicsParams
}

export interface AppAdsCategoryConfig<T extends AppAdsCategory> {
  label: string
  paramLabels: Record<keyof AppAdsParamsMap[T], string>
  valueLabels?: Record<string, string>
  paramOptions?: Record<string, string[]>
  numericParams?: string[]
}

interface AppAdBase {
  id: string
  title: string
  description?: string
  price?: number
  needsRevision?: true
  createdAt?: string
  updatedAt?: string
}

export type AppAd = AppAdBase &
  (
    | { category: "auto"; params: AppAdsAutoParams }
    | { category: "realty"; params: AppAdsRealtyParams }
    | { category: "electro"; params: AppAdsElectronicsParams }
  )

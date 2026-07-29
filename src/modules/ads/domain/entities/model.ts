export interface AppAd {
  id: string
  title: string
  description?: string
  price: number
  category: "auto" | "electro" | "realty"
  needsRevision: boolean
}

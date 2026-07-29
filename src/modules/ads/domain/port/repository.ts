import { AppAd } from "@/modules/ads/domain/entities"

export interface AppAdsListInput {}

export interface AppAdsListOutput {
  data: AppAd[]
  meta: {
    total: number
  }
}

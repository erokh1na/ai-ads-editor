import { AppAdsListInput } from "@/modules/ads/domain/port"

export interface FormValues {
  categories: AppAdsListInput["categories"]
  needsRevision: AppAdsListInput["needsRevision"]
}

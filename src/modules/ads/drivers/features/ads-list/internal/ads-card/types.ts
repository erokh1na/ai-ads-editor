import { AppAd, AppAdsViewMode } from "@/modules/ads/domain/entities"

export interface AdsCardProps {
  item: AppAd
  view?: AppAdsViewMode
}

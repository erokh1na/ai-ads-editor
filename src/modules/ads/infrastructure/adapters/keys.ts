import { AppAdsListInput } from "@/modules/ads/domain/port"

export const adsApiKeys = {
  all: ["ads"] as const,

  lists: () => [...adsApiKeys.all, "ads"] as const,
  list: (input: AppAdsListInput) => [...adsApiKeys.lists(), input] as const,
}

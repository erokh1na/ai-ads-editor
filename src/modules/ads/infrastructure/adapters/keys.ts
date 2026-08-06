import { AppAdInput, AppAdsListInput } from "@/modules/ads/domain/port"

export const adsApiKeys = {
  all: ["ads"] as const,

  detail: (input: AppAdInput) => [...adsApiKeys.all, "one", input.id],

  lists: () => [...adsApiKeys.all, "list"] as const,
  list: (input: AppAdsListInput) => [...adsApiKeys.lists(), input] as const,
}

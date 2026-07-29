import { adsApiClient } from "@/modules/ads/infrastructure/adapters"

export function useAdsList() {
  const query = adsApiClient.useList({})

  const data = query.data?.data ?? []

  return {
    query,
    data,
  }
}

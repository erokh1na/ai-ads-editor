import { fetcherClient } from "@/core/fetcher"
import { AppAdInput, AppAdsListInput } from "@/modules/ads/domain/port"
import { useQuery } from "@tanstack/react-query"
import { adsApiKeys } from "./keys"
import { toDomainAd, toDomainAdsList, toServerAdsList } from "./mapper"
import type { ServerAdResponse, ServerAdsListResponse } from "./types"

const useList = (input: AppAdsListInput) => {
  return useQuery({
    queryKey: adsApiKeys.list(input),
    queryFn: () => fetcherClient.get<ServerAdsListResponse>("/items", { params: toServerAdsList(input) }),
    select: (response) => toDomainAdsList(response.data),
    staleTime: 30_000,
  })
}

const useDetail = (input: AppAdInput) => {
  return useQuery({
    queryKey: adsApiKeys.detail(input),
    queryFn: () => fetcherClient.get<ServerAdResponse>(`/items/${input.id}`),
    select: (response) => toDomainAd(response.data),
    staleTime: 30_000,
  })
}

export const adsApiClient = {
  useList,
  useDetail,
}

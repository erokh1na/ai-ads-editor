import { fetcherClient } from "@/core/fetcher"
import { AppAdsListInput } from "@/modules/ads/domain/port"
import { useQuery } from "@tanstack/react-query"
import { adsApiKeys } from "./keys"
import { toDomainAdsList, toServerAdsList } from "./mapper"
import type { ServerAdsListResponse } from "./types"

const useList = (input: AppAdsListInput) => {
  return useQuery({
    queryKey: adsApiKeys.list(input),
    queryFn: () => fetcherClient.get<ServerAdsListResponse>("/items", { params: toServerAdsList(input) }),
    select: (response) => toDomainAdsList(response.data),
    staleTime: 30_000,
  })
}

export const adsApiClient = {
  useList,
}

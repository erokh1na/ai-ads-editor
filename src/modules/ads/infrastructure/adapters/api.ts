import { fetcherClient } from "@/core/fetcher"
import { AppAdsListInput } from "@/modules/ads/domain/port"
import { useQuery } from "@tanstack/react-query"
import { adsApiKeys } from "./keys"
import { toDomainAdsList } from "./mapper"
import type { ServerAdsListResponse } from "./types"

const useList = (input: AppAdsListInput) => {
  return useQuery({
    queryKey: adsApiKeys.list(input),
    queryFn: () => fetcherClient.get<ServerAdsListResponse>("/items", { params: input }),
    select: (response) => toDomainAdsList(response.data),
  })
}

export const adsApiClient = {
  useList,
}

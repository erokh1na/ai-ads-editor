import { AppAd } from "@/modules/ads/domain/entities"
import { AppAdsListOutput } from "@/modules/ads/domain/port"
import { ServerAd, ServerAdsListResponse } from "./types"

const categoryMap: Record<ServerAd["category"], AppAd["category"]> = {
  auto: "auto",
  electronics: "electro",
  real_estate: "realty",
}

function toDomainAd(item: ServerAdsListResponse["items"][number]): AppAd {
  return {
    id: item.title + item.category,
    title: item.title,
    price: item.price,
    category: categoryMap[item.category],
    needsRevision: item.needsRevision,
  }
}

export function toDomainAdsList(response: ServerAdsListResponse): AppAdsListOutput {
  return {
    data: response.items.map(toDomainAd),
    meta: {
      total: response.total,
    },
  }
}

import { AppAd, AppAdCategory } from "@/modules/ads/domain/entities"
import { AppAdsListInput, AppAdsListOutput } from "@/modules/ads/domain/port"
import { ServerAdCategory, ServerAdsListParams, ServerAdsListResponse } from "./types"

const categoryMap = {
  auto: "auto",
  electronics: "electro",
  real_estate: "realty",
} satisfies Record<ServerAdCategory, AppAdCategory>

const reverseCategoryMap = {
  auto: "auto",
  electro: "electronics",
  realty: "real_estate",
} satisfies Record<AppAdCategory, ServerAdCategory>

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

export function toServerAdsList(input: AppAdsListInput): ServerAdsListParams {
  return {
    q: input.search,
    limit: input.limit,
    skip: input.skip,
    needsRevision: input.needsRevision,
    categories: input.categories?.map((category) => reverseCategoryMap[category]).join(","),
    sortColumn: input.sortColumn,
    sortDirection: input.sortDirection,
  }
}

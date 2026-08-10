import { ADS_BY_VIEW, AppAdsCategory, AppAdsViewMode } from "@/modules/ads/domain/entities"
import { AppAdsListInput } from "@/modules/ads/domain/port"
import { adsApiClient } from "@/modules/ads/infrastructure/adapters"
import { useSearchParams } from "react-router"

export function useAdsList() {
  const [searchParams] = useSearchParams()

  const view = searchParams.get("view") as AppAdsViewMode
  const limit = view ? ADS_BY_VIEW[view] : ADS_BY_VIEW["grid"]
  const page = +searchParams.get("page") || 1

  const filters: Partial<AppAdsListInput> = {
    search: searchParams.get("search"),
    categories: (searchParams.get("categories")?.split(",").filter(Boolean) as AppAdsCategory[]) ?? [],
    needsRevision: searchParams.get("needsRevision") === "true" || undefined,
    sortDirection: (searchParams.get("sortDirection") as AppAdsListInput["sortDirection"]) || "desc",
    limit,
    skip: (page - 1) * limit,
  }

  const query = adsApiClient.useList(filters)
  const data = query.data?.data ?? []
  const total = query.data?.meta?.total ?? 0

  const isLoading = query.isLoading
  const skeletons = new Array(filters.limit).fill(0)

  return {
    query,
    data,
    total,
    view,
    isLoading,
    skeletons,
  }
}

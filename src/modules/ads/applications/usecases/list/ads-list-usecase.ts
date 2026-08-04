import { AppAdCategory, AppAdsViewMode } from "@/modules/ads/domain/entities"
import { AppAdsListInput } from "@/modules/ads/domain/port"
import { adsApiClient } from "@/modules/ads/infrastructure/adapters"
import { useSearchParams } from "react-router"

export function useAdsList() {
  const [searchParams] = useSearchParams()

  const filters: Partial<AppAdsListInput> = {
    search: searchParams.get("search"),
    categories: (searchParams.get("categories")?.split(",") as AppAdCategory[]) ?? [],
    needsRevision: searchParams.get("needsRevision") === "true" || undefined,
    sortDirection: (searchParams.get("sortDirection") as AppAdsListInput["sortDirection"]) || "desc",
    limit: searchParams.get("view") === ("list" as AppAdsViewMode) ? 4 : 10,
  }

  const viewMode = searchParams.get("view") as AppAdsViewMode

  const query = adsApiClient.useList(filters)
  const data = query.data?.data ?? []

  return {
    query,
    data,
    viewMode,
  }
}

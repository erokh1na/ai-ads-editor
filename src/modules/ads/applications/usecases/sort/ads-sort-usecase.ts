import { AppAdsListInput } from "@/modules/ads/domain/port"
import { useUpdateSearchParams } from "@/shared/hooks"
import { useSearchParams } from "react-router"

export function useAdsSort() {
  const [searchParams] = useSearchParams()
  const updateSearchParams = useUpdateSearchParams()

  const sortDirection = (searchParams.get("sortDirection") as AppAdsListInput["sortDirection"]) || "desc"

  function setSortDirection(sortValue: AppAdsListInput["sortDirection"]) {
    updateSearchParams({ sortDirection: sortValue || undefined })
  }

  function reset() {
    updateSearchParams({ sortDirection: undefined })
  }

  return {
    sortDirection,
    setSortDirection,
    reset,
  }
}

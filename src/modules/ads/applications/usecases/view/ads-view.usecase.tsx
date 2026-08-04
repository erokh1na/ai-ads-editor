import { AppAdsViewMode } from "@/modules/ads/domain/entities"
import { useUpdateSearchParams } from "@/shared/hooks"
import { useSearchParams } from "react-router"

export const useAdsView = () => {
  const [searchParams] = useSearchParams()
  const updateSearchParams = useUpdateSearchParams()

  const view = (searchParams.get("view") as AppAdsViewMode) || "grid"

  function setView(mode: AppAdsViewMode) {
    updateSearchParams({ view: mode || undefined })
  }

  return {
    view,
    setView,
  }
}

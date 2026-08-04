import { ADS_BY_VIEW } from "@/modules/ads/domain/entities"
import { useUpdateSearchParams } from "@/shared/hooks"
import { useSearchParams } from "react-router"

export function useAdsPagination() {
  const [searchParams] = useSearchParams()
  const updateSearchParams = useUpdateSearchParams()

  const pageSize = ADS_BY_VIEW[searchParams.get("view")] || 10
  const page = Number(searchParams.get("page")) || 1

  const setPage = (newPage: number) => {
    updateSearchParams({ page: String(newPage) || undefined })
  }

  return {
    page,
    pageSize,
    setPage,
  }
}

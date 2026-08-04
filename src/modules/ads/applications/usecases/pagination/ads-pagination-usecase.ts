import { useUpdateSearchParams } from "@/shared/hooks"
import { useSearchParams } from "react-router"

export function useAdsPagination() {
  const [searchParams] = useSearchParams()
  const updateSearchParams = useUpdateSearchParams()

  const pageSize = searchParams.get("view") === "grid" ? 4 : 10
  const page = Number(searchParams.get("page")) || 1
  const skip = (page - 1) * pageSize

  const setPage = (newPage: number) => {
    updateSearchParams({ page: String(newPage) || undefined, skip: String((newPage - 1) * pageSize) || undefined })
  }

  return {
    page,
    pageSize,
    skip,
    setPage,
  }
}

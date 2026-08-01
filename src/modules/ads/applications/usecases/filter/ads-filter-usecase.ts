import { AppAdCategory } from "@/modules/ads/domain/entities"
import { useUpdateSearchParams } from "@/shared/hooks"
import { useSearchParams } from "react-router"

export function useFilter() {
  const [searchParams] = useSearchParams()
  const updateSearchParams = useUpdateSearchParams()

  const categories = (searchParams.get("categories")?.split(",") as AppAdCategory[]) ?? []
  const needsRevision = searchParams.get("needsRevision") === "true"

  function setCategories(categories: AppAdCategory[]) {
    updateSearchParams({ categories: categories.length > 0 ? categories.join(",") : undefined })
  }

  function setNeedsRevision(needsRevision: boolean) {
    updateSearchParams({ needsRevision: needsRevision ? "true" : undefined })
  }

  function reset() {
    updateSearchParams({ categories: undefined, needsRevision: undefined })
  }

  return {
    categories,
    needsRevision,
    setCategories,
    setNeedsRevision,
    reset,
  }
}

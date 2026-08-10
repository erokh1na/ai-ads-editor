import { useUpdateSearchParams } from "@/shared/hooks"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"

export function useAdsSearch() {
  const [searchParams] = useSearchParams()
  const updateSearchParams = useUpdateSearchParams()

  const [search, setSearch] = useState(searchParams.get("search") || "")

  useEffect(() => {
    const trimmed = search.trim()

    if (trimmed.length < 3) {
      if (searchParams.get("search")) updateSearchParams({ search: undefined })

      return
    }

    const timeout = setTimeout(() => {
      updateSearchParams({ search: trimmed || undefined })
    }, 500)

    return () => clearTimeout(timeout)
  }, [search])

  function reset() {
    updateSearchParams({ search: undefined })
  }

  return {
    search,
    setSearch,
    reset,
  }
}

import { useSearchParams } from "react-router"

export function useUpdateSearchParams() {
  const [, setSearchParams] = useSearchParams()

  return function updateSearchParams(updates: Record<string, string | undefined>) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)

      for (const [key, value] of Object.entries(updates)) {
        if (value === undefined) next.delete(key)
        else next.set(key, value)
      }

      return next
    })
  }
}

import { adsApiClient } from "@/modules/ads/infrastructure/adapters"
import { useParams } from "react-router"

export function useAdDetail() {
  const params = useParams()

  const id = params.id

  const query = adsApiClient.useDetail({ id })
  const data = query.data

  const isLoading = query.isLoading

  return {
    query,
    data,
    isLoading,
  }
}

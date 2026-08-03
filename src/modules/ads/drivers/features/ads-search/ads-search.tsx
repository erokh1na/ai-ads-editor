import { useAdsSearch } from "@/modules/ads/applications/usecases/search"
import { Input } from "antd"

export const AdsSearch = () => {
  const adsSearch = useAdsSearch()

  return (
    <Input
      allowClear
      onClear={adsSearch.reset}
      placeholder="Найти объявление..."
      value={adsSearch.search}
      onChange={(e) => adsSearch.setSearch(e.target.value)}
    />
  )
}

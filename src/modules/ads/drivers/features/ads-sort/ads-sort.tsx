import { useAdsSort } from "@/modules/ads/applications/usecases"
import { Select } from "antd"

export const AdsSort = () => {
  const adsSort = useAdsSort()
  const sortDirections = [
    {
      value: "desc",
      label: "Сначала новые",
    },
    {
      value: "asc",
      label: "Сначала старые",
    },
  ]

  return <Select value={adsSort.sortDirection} onChange={adsSort.setSortDirection} options={sortDirections} />
}

import { useAdsSearch } from "@/modules/ads/applications/usecases/search"
import { Input } from "antd"
import styles from "./ads-search-bar.module.scss"

export const AdsSearchBar = () => {
  const adsSearch = useAdsSearch()

  return (
    <div className={styles.container}>
      <Input
        className={styles.input}
        allowClear
        onClear={adsSearch.reset}
        placeholder="Найти объявление..."
        value={adsSearch.search}
        onChange={(e) => adsSearch.setSearch(e.target.value)}
      />
    </div>
  )
}

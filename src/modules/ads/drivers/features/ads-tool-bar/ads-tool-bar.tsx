import { AdsSearch, AdsSort, AdsViewToggle } from "@/modules/ads/drivers/features"
import styles from "./ads-tool-bar.module.scss"

export const AdsToolBar = () => {
  return (
    <div className={styles.container}>
      <AdsSearch />
      <AdsViewToggle />
      <AdsSort />
    </div>
  )
}

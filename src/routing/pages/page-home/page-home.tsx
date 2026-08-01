import { AdsFilterBar, AdsList, AdsSearchBar } from "@/modules/ads/drivers/features"
import styles from "./page-home.module.scss"

export const PageHome = () => {
  return (
    <div className={styles.page}>
      <div className={styles.head}>
        <AdsSearchBar />
      </div>
      <div className={styles.body}>
        <AdsFilterBar />
        <AdsList />
      </div>
    </div>
  )
}

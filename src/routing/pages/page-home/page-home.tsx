import { AdsFilterBar, AdsList, AdsToolBar } from "@/modules/ads/drivers/features"
import styles from "./page-home.module.scss"

export const PageHome = () => {
  return (
    <div className={styles.page}>
      <div className={styles.head}>
        <AdsToolBar />
      </div>
      <div className={styles.body}>
        <AdsFilterBar />
        <AdsList />
      </div>
    </div>
  )
}

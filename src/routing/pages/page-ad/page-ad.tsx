import { AdDetail } from "@/modules/ads/drivers/features"
import styles from "./page-ad.module.scss"

export const PageAd = () => {
  return (
    <div className={styles.page}>
      <AdDetail />
    </div>
  )
}

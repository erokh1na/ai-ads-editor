import { AdEditForm } from "@/modules/ads/drivers/features"
import styles from "./page-ad-edit.module.scss"

export const PageAdEdit = () => {
  return (
    <div className={styles.page}>
      <AdEditForm />
    </div>
  )
}

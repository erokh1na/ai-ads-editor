import { useAdsView } from "@/modules/ads/applications/usecases"
import { AppstoreOutlined, UnorderedListOutlined } from "@ant-design/icons"
import clsx from "clsx"
import styles from "./ads-view-toggle.module.scss"

export const AdsViewToggle = () => {
  const adsView = useAdsView()

  return (
    <div className={styles.conatainer}>
      <button
        className={clsx([styles.button, { [styles["button-active"]]: adsView.view === "grid" }])}
        onClick={() => adsView.setView("grid")}
      >
        <AppstoreOutlined />
      </button>
      <div className={styles.divider} />
      <button
        className={clsx([styles.button, { [styles["button-active"]]: adsView.view === "list" }])}
        onClick={() => adsView.setView("list")}
      >
        <UnorderedListOutlined />
      </button>
    </div>
  )
}

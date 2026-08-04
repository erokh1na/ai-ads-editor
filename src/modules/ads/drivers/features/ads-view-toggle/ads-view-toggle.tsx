import { useAdsView } from "@/modules/ads/applications/usecases"
import { AppstoreOutlined, UnorderedListOutlined } from "@ant-design/icons"
import clsx from "clsx"
import style from "./ads-view-toggle.module.scss"

export const AdsViewToggle = () => {
  const adsView = useAdsView()

  return (
    <div className={style.container}>
      <button
        className={clsx([style.button, { [style["button-active"]]: adsView.view === "grid" }])}
        onClick={() => adsView.setView("grid")}
      >
        <AppstoreOutlined />
      </button>
      <div className={style.divider} />
      <button
        className={clsx([style.button, { [style["button-active"]]: adsView.view === "list" }])}
        onClick={() => adsView.setView("list")}
      >
        <UnorderedListOutlined />
      </button>
    </div>
  )
}

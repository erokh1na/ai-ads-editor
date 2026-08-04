import { useAdsList } from "@/modules/ads/applications/usecases"
import { AdsCard, AdsPagination } from "@/modules/ads/drivers/features/"
import clsx from "clsx"
import styles from "./ads-list.module.scss"

export const AdsList = () => {
  const adsList = useAdsList()

  return (
    <div className={clsx([styles.list, styles[`list-${adsList.viewMode}`]])}>
      {adsList.data.map((item) => (
        <AdsCard item={item} viewMode={adsList.viewMode} key={item.id} />
      ))}
      <AdsPagination />
    </div>
  )
}

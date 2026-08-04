import { useAdsList } from "@/modules/ads/applications/usecases"
import { AdsCard, AdsPagination } from "@/modules/ads/drivers/features/"
import { AdsCardSkeleton } from "@/modules/ads/drivers/features/ads-card-skeleton/ads-card-skeleton"
import clsx from "clsx"
import styles from "./ads-list.module.scss"

export const AdsList = () => {
  const adsList = useAdsList()

  return (
    <div className={styles.container}>
      <div className={clsx(styles.list, styles[`list-${adsList.viewMode}`])}>
        {adsList.isLoading
          ? adsList.skeletons.map((_, index) => <AdsCardSkeleton key={index} viewMode={adsList.viewMode} />)
          : adsList.data.map((item) => <AdsCard item={item} viewMode={adsList.viewMode} key={item.id} />)}
      </div>
      {!adsList.isLoading && <AdsPagination />}
    </div>
  )
}

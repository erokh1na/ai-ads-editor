import { useAdsList } from "@/modules/ads/applications/usecases"
import { AdsPagination } from "@/modules/ads/drivers/features/"
import clsx from "clsx"
import styles from "./ads-list.module.scss"
import { AdsCard, AdsCardSkeleton } from "./internal"

export const AdsList = () => {
  const adsList = useAdsList()

  return (
    <div className={styles.container}>
      <div className={clsx(styles.list, styles[`list-${adsList.view}`])}>
        {adsList.isLoading
          ? adsList.skeletons.map((_, index) => <AdsCardSkeleton key={index} view={adsList.view} />)
          : adsList.data.map((item) => <AdsCard item={item} view={adsList.view} key={item.id} />)}
      </div>
      {!adsList.isLoading && <AdsPagination />}
    </div>
  )
}

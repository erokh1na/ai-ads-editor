import { useAdDetail } from "@/modules/ads/applications/usecases"
import styles from "./ad-detail.module.scss"
import { AdDetailBody, AdDetailHeader, AdDetailSkeleton } from "./internal"

export const AdDetail = () => {
  const adsDetail = useAdDetail()

  return (
    <div className={styles.detail}>
      {adsDetail.isLoading ? (
        <AdDetailSkeleton />
      ) : (
        <>
          <AdDetailHeader item={adsDetail.data} />
          <AdDetailBody item={adsDetail.data} />
        </>
      )}
    </div>
  )
}

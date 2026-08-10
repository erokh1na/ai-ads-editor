import { useAdDetail } from "@/modules/ads/applications/usecases"
import { AdDetailBody, AdDetailHeader, AdDetailSkeleton } from "./internal"

export const AdDetail = () => {
  const adsDetail = useAdDetail()

  return (
    <>
      {adsDetail.isLoading ? (
        <AdDetailSkeleton />
      ) : (
        <>
          <AdDetailHeader item={adsDetail.data} />
          <AdDetailBody item={adsDetail.data} />
        </>
      )}
    </>
  )
}

import { useAdsList } from "@/modules/ads/applications/usecases"
import { AdsCard } from "@/modules/ads/drivers/features/"
import { useEffect } from "react"
import styles from "./ads-list.module.scss"

export const AdsList = () => {
  const adsList = useAdsList()

  useEffect(() => {
    console.log("adsList", adsList.data)
  }, [adsList.data])

  return (
    <div className={styles.list}>
      {adsList.data.map((item) => (
        <AdsCard item={item} />
      ))}
    </div>
  )
}

import { AD_CATEGORIES } from "@/modules/ads/domain/entities"
import { formatNumber } from "@/shared/utils"
import clsx from "clsx"
import styles from "./ads-card.module.scss"
import cover from "./cover.jpg"
import { AdsCardProps } from "./types"

export const AdsCard = (props: AdsCardProps) => {
  return (
    <div className={clsx([styles.card, styles[`card-${props.view}`]])}>
      <img className={styles.cover} src={cover} alt="cover" />
      <div className={styles.body}>
        <div className={styles.category}>{AD_CATEGORIES[props.item.category]}</div>
        <div className={styles.title}>{props.item.title}</div>
        <div className={styles.price}>{`${formatNumber(props.item.price)} ₽`}</div>
        {props.item.needsRevision && <div className={styles["needs-revision"]}>Требует доработок</div>}
      </div>
    </div>
  )
}

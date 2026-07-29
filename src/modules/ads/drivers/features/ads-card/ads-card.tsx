import { formatNumber } from "@/shared"
import styles from "./ads-card.module.scss"
import cover from "./cover.jpg"
import { AdsCardProps } from "./types"

export const AdsCard = (props: AdsCardProps) => {
  return (
    <div className={styles.card}>
      <img className={styles.cover} src={cover} alt="cover" />
      <div className={styles.body}>
        <div className={styles.category}>{props.item.category}</div>
        <div className={styles.title}>{props.item.title}</div>
        <div className={styles.price}>{`${formatNumber(props.item.price)} ₽`}</div>
        {props.item.needsRevision && <div className={styles["needs-revision"]}>Требует доработок</div>}
      </div>
    </div>
  )
}

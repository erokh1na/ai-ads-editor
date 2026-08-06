import clsx from "clsx"
import styles from "./ads-card-skeleton.module.scss"
import { AdsCardSkeletonProps } from "./types"

export const AdsCardSkeleton = (props: AdsCardSkeletonProps) => {
  return (
    <div className={clsx(styles.card, styles[`card-${props.view}`])}>
      <div className={styles.cover} />
      <div className={styles.body}>
        <div className={styles.title} />
        <div className={styles.price} />
      </div>
    </div>
  )
}

import styles from "./ad-detail-skeleton.module.scss"

export const AdDetailSkeleton = () => {
  return (
    <div className={styles.detail}>
      <div className={styles.header}>
        <div className={styles.column}>
          <div className={styles.title} />
          <div className={styles.button} />
        </div>
        <div className={styles.column}>
          <div className={styles.price} />
          <div className={styles.dates}>
            <div className={styles.date} />
            <div className={styles.date} />
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.column}>
          <div className={styles.cover} />
          <div className={styles.description}>
            <div className={styles["description-title"]} />
            <div className={styles["description-text"]} />
            <div className={styles["description-text"]} />
            <div className={styles["description-text-short"]} />
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.specs}>
            <div className={styles["specs-title"]} />
            <div className={styles["specs-body"]}>
              <div className={styles["specs-row"]} />
              <div className={styles["specs-row"]} />
              <div className={styles["specs-row"]} />
              <div className={styles["specs-row"]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import styles from "./ad-edit-form-skeleton.module.scss"

export const AdEditFormSkeleton = () => {
  return (
    <div>
      <div className={styles.title} />

      <div className={styles.row}>
        <div className={styles.label} />
        <div className={styles.select} />
      </div>
      <div className={styles.divider} />

      <div className={styles.row}>
        <div className={styles.label} />
        <div className={styles.input} />
      </div>
      <div className={styles.divider} />

      <div className={styles.row}>
        <div className={styles.label} />
        <div className={styles.input} />
      </div>
      <div className={styles.divider} />

      <div className={styles["form-group"]}>
        <div className={styles["form-group-title"]} />
        {Array.from({ length: 4 }).map((_, index) => (
          <div className={styles.row} key={index}>
            <div className={styles.label} />
            <div className={styles.input} />
          </div>
        ))}
      </div>
      <div className={styles.divider} />

      <div className={styles.row}>
        <div className={styles.label} />
        <div className={styles.textarea} />
      </div>

      <div className={styles["button-group"]}>
        <div className={styles.button} />
        <div className={styles.button} />
      </div>
    </div>
  )
}

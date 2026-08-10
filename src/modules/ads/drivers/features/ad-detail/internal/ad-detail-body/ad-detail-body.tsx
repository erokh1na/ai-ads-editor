import { AD_CATEGORY_CONFIG } from "@/modules/ads/domain/entities"
import styles from "./ad-detail-body.module.scss"
import { AdDetailBodyProps } from "./types"
import cover from "/product.jpg"

export const AdDetailBody = (props: AdDetailBodyProps) => {
  const categoryParams = AD_CATEGORY_CONFIG[props.item.category]
  const paramEntries = Object.entries(props.item.params)

  const filled = paramEntries.filter(([, value]) => value)

  const missed = [
    ...paramEntries.filter(([, value]) => !value).map(([key]) => categoryParams[key].label),
    ...(props.item.description ? [] : ["Описание"]),
  ]

  const formatValue = (key: string, value: string | number) =>
    categoryParams[key].options?.find((option) => option.value === value)?.label ?? value

  return (
    <div className={styles.body}>
      <div className={styles.column}>
        <img className={styles.cover} src={cover} alt="cover" />
        {props.item.description && (
          <div className={styles.description}>
            <h3 className={styles["description-title"]}>Описание</h3>
            <p className={styles["description-text"]}>{props.item.description}</p>
          </div>
        )}
      </div>
      <div className={styles.column}>
        {missed.length > 0 && (
          <div className={styles.disclaimer}>
            <h3 className={styles["disclaimer-title"]}>Требуются доработки</h3>
            <p className={styles["disclaimer-description"]}>У объявления не заполнены поля</p>
            <ul className={styles["disclaimer-list"]}>
              {missed.map((label) => (
                <li className={styles["disclaimer-list-item"]} key={label}>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        )}

        {filled.length > 0 && (
          <div className={styles.specs}>
            <h3 className={styles["specs-title"]}>Характеристики</h3>
            <div className={styles["specs-body"]}>
              {filled.map(([key, value]) => (
                <div key={key} className={styles["specs-row"]}>
                  <span className={styles["specs-label"]}>{categoryParams[key].label}</span>
                  <span className={styles["specs-value"]}>{formatValue(key, value)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

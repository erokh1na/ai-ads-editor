import { AD_CATEGORY_CONFIG } from "@/modules/ads/domain/entities"
import styles from "./ad-detail-body.module.scss"
import { AdDetailBodyProps } from "./types"
import cover from "/product.jpg"

export const AdDetailBody = (props: AdDetailBodyProps) => {
  const config = AD_CATEGORY_CONFIG[props.item.category]
  const specs = Object.entries(props.item.params).reduce(
    (acc, [key, value]) => {
      if (value) {
        acc.filled.push([key, value])
      } else {
        acc.missed.push(key)
      }

      return acc
    },
    {
      filled: [],
      missed: [],
    },
  )

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
        {specs.missed.length > 0 && (
          <div className={styles.disclaimer}>
            <h3 className={styles["disclaimer-title"]}>Требуются доработки</h3>
            <p className={styles["disclaimer-description"]}>У объявления не заполнены поля</p>
            <ul className={styles["disclaimer-list"]}>
              {specs.missed.map((key) => (
                <li className={styles["disclaimer-list-item"]} key={key}>
                  {config.paramLabels[key]}
                </li>
              ))}
            </ul>
          </div>
        )}

        {specs.filled.length > 0 && (
          <div className={styles.specs}>
            <h3 className={styles["specs-title"]}>Характеристики</h3>
            <div className={styles["specs-body"]}>
              {specs.filled.map(([key, value]) => (
                <div key={key} className={styles["specs-row"]}>
                  <span className={styles["specs-label"]}>
                    {config.paramLabels[key as keyof typeof config.paramLabels]}
                  </span>
                  <span className={styles["specs-value"]}>{config.valueLabels?.[value as string] ?? value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

import { useFilter } from "@/modules/ads/applications/usecases"
import { AD_CATEGORIES, type AppAdsCategory } from "@/modules/ads/domain/entities"
import { Button, Checkbox, Switch } from "antd"
import styles from "./ads-filter-bar.module.scss"

export const AdsFilterBar = () => {
  const adsFilter = useFilter()
  const checkboxesOptions = (Object.entries(AD_CATEGORIES) as [AppAdsCategory, string][]).map(([value, label]) => ({
    value,
    label,
  }))

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <h3 className={styles.title}>Фильтры</h3>

        <div className={styles["checkboxes-block"]}>
          <p className={styles["checkboxes-label"]}>Категория</p>
          <Checkbox.Group
            className={styles.checkboxes}
            value={adsFilter.categories}
            onChange={adsFilter.setCategories}
            options={checkboxesOptions}
          />
        </div>

        <div className={styles["switch-block"]}>
          <p className={styles["switch-label"]}>Только требующие доработок</p>
          <Switch className={styles.switch} checked={adsFilter.needsRevision} onChange={adsFilter.setNeedsRevision} />
        </div>
      </div>

      <Button className={styles.button} onClick={adsFilter.reset}>
        Сбросить фильтры
      </Button>
    </div>
  )
}

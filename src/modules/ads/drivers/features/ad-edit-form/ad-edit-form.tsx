import { useAdEditForm } from "@/modules/ads/applications/usecases"
import type { AppAdsCategory } from "@/modules/ads/domain/entities"
import { AD_CATEGORIES, AD_CATEGORY_CONFIG } from "@/modules/ads/domain/entities"
import { Button } from "antd"
import { FormProvider } from "react-hook-form"
import styles from "./ad-edit-form.module.scss"
import { AdEditFormField, AdEditFormSkeleton } from "./internal"

export const AdEditForm = () => {
  const adEditForm = useAdEditForm()

  const category = (adEditForm.methods.watch("category") as AppAdsCategory) || adEditForm.query.data?.category || "auto"
  const categoryParams = AD_CATEGORY_CONFIG[category]

  if (!adEditForm.query.data) return <AdEditFormSkeleton />

  const categoriesOptions = Object.entries(AD_CATEGORIES).map(([key, value]) => ({
    label: value,
    value: key,
  }))

  const mainFields = [
    {
      key: "category",
      divider: true,
      field: {
        type: "select" as const,
        name: "category",
        label: "Категория",
        options: categoriesOptions,
        className: styles["form-category-select"],
      },
    },
    {
      key: "title",
      divider: true,
      field: {
        type: "input" as const,
        name: "title",
        label: "Название",
        required: true,
      },
    },
    {
      key: "price",
      divider: true,
      field: {
        type: "input" as const,
        name: "price",
        label: "Цена",
        required: true,
        numeric: true,
      },
    },
  ]

  const paramsFields = Object.entries(categoryParams).map(([key, config]) => ({
    key,
    field: {
      type: config.options ? ("select" as const) : ("input" as const),
      name: `params.${key}`,
      label: config.label,
      required: key === "type",
      options: config.options,
      numeric: config.numeric || null,
    },
  }))

  const descriptionField = {
    key: "description",
    divider: false,
    field: {
      type: "textarea" as const,
      name: "description",
      label: "Описание",
    },
    popover: "description",
  }

  return (
    <FormProvider {...adEditForm.methods}>
      <form className={styles.form} onSubmit={adEditForm.submit}>
        <h1 className={styles.title}>Редактирование объявления</h1>

        {mainFields.map(({ key, field, divider }) => (
          <div key={key}>
            <AdEditFormField {...field} />
            {divider && <div className={styles.divider} />}
          </div>
        ))}

        <div className={styles["form-group"]}>
          <p className={styles["form-label-strong"]}>Характеристики</p>
          {paramsFields.map(({ key, field }) => (
            <AdEditFormField key={key} {...field} />
          ))}
        </div>

        <div className={styles.divider} />

        <AdEditFormField {...descriptionField.field} popover={descriptionField.popover} />
        <div className={styles["button-group"]}>
          <Button type="primary" htmlType="submit" disabled={!adEditForm.isValid} loading={adEditForm.isSubmitting}>
            Сохранить
          </Button>
          <Button onClick={adEditForm.cancel}>Отменить</Button>
        </div>
      </form>
    </FormProvider>
  )
}

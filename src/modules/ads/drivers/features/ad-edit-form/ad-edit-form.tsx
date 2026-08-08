import { useAdEditForm } from "@/modules/ads/applications/usecases"
import { AD_CATEGORIES, AD_CATEGORY_CONFIG } from "@/modules/ads/domain/entities"
import { Button } from "antd"
import { FormProvider } from "react-hook-form"
import styles from "./ad-edit-form.module.scss"
import { AdEditFormField } from "./internal"

export const AdEditForm = () => {
  const adEditForm = useAdEditForm()

  if (!adEditForm.query.data) return null

  const config = AD_CATEGORY_CONFIG[adEditForm.query.data.category]

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
      field: { type: "input" as const, name: "title", label: "Название", required: true },
    },
    {
      key: "price",
      divider: true,
      field: { type: "input" as const, name: "price", label: "Цена", required: true },
    },
  ]

  const descriptionField = {
    key: "description",
    divider: false,
    field: { type: "textarea" as const, name: "description", label: "Описание" },
  }

  const specFields = Object.entries(config.paramLabels).map(([key, label]) => {
    const options = config.paramOptions?.[key]
    const field = options
      ? {
          type: "select" as const,
          name: `params.${key}`,
          label,
          options: options.map((optionKey) => ({
            label: config.valueLabels?.[optionKey] ?? optionKey,
            value: optionKey,
          })),
        }
      : { type: "input" as const, name: `params.${key}`, label }
    return { key, field }
  })

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
          {specFields.map(({ key, field }) => (
            <AdEditFormField key={key} {...field} />
          ))}
        </div>

        <div className={styles.divider} />

        <AdEditFormField {...descriptionField.field} />
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

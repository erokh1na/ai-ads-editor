import { Input, Select } from "antd"
import clsx from "clsx"
import { Controller, useFormContext } from "react-hook-form"
import styles from "./ad-edit-form-field.module.scss"
import { AdEditFormFieldProps } from "./types"

export const AdEditFormField = (props: AdEditFormFieldProps) => {
  const { control } = useFormContext()

  return (
    <div className={styles["form-row"]}>
      <p className={styles["form-label-strong"]}>{props.label}</p>

      <Controller
        name={props.name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            {props.type === "select" && (
              <Select
                {...field}
                className={clsx(styles["form-input"], props.className)}
                placeholder={props.label}
                options={props.options}
                status={fieldState.error ? "error" : undefined}
              />
            )}

            {props.type === "input" && (
              <Input
                {...field}
                className={styles["form-input"]}
                placeholder={props.label}
                status={fieldState.error ? "error" : undefined}
              />
            )}

            {props.type === "textarea" && (
              <Input.TextArea
                {...field}
                className={styles["form-textarea"]}
                maxLength={1000}
                showCount
                autoSize={{ minRows: 3 }}
                status={fieldState.error ? "error" : undefined}
              />
            )}

            {fieldState.error && <p className={styles["form-error"]}>{fieldState.error.message}</p>}
          </>
        )}
      />
    </div>
  )
}

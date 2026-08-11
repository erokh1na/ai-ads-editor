import { AiDescriptionPopover, AiPricePopover } from "@/modules/ai/drivers/features"
import { Input, Select } from "antd"
import clsx from "clsx"
import { Controller, useFormContext } from "react-hook-form"
import styles from "./ad-edit-form-field.module.scss"
import { AdEditFormFieldProps } from "./types"
import requiredIcon from "/icons/required.svg"

export const AdEditFormField = (props: AdEditFormFieldProps) => {
  const { control } = useFormContext()

  return (
    <div className={styles["form-row"]}>
      <div className={styles["form-label"]}>
        {props.required && <img className={styles["form-label-icon"]} src={requiredIcon} alt="" />}
        <p className={styles["form-label-text"]}>{props.label}</p>
      </div>

      <Controller
        name={props.name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <div className={styles["form-input-wrapper"]}>
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
                  type="text"
                  inputMode={props.numeric ? "numeric" : "text"}
                  className={clsx(styles["form-input"])}
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

              {props.name === "price" && <AiPricePopover />}
              {props.name === "description" && <AiDescriptionPopover />}
            </div>

            {fieldState.error && <p className={styles["form-error"]}>{fieldState.error.message}</p>}
          </>
        )}
      />
    </div>
  )
}

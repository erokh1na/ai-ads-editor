export type AdEditFormFieldProps =
  | { type: "input"; name: string; label: string; required?: boolean }
  | { type: "textarea"; name: string; label: string; required?: boolean }
  | {
      type: "select"
      name: string
      label: string
      required?: boolean
      options: { label: string; value: string }[]
      className?: string
    }

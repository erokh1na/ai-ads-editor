export type AdEditFormFieldProps =
  | {
      type: "input"
      name: string
      label: string
      required?: boolean
      numeric?: boolean
      popover?: string
    }
  | {
      type: "textarea"
      name: string
      label: string
      required?: boolean
      popover?: string
    }
  | {
      type: "select"
      name: string
      label: string
      required?: boolean
      options: { label: string; value: string }[]
      className?: string
      popover?: string
    }

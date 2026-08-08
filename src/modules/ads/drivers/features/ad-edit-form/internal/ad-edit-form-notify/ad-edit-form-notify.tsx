import { Alert } from "antd"
import { AdEditFormNotifyProps } from "./types"

export const AdEditFormNotify = (props: AdEditFormNotifyProps) => {
  if (!props.state) return null

  return (
    <>
      {props.state === "error" && (
        <Alert
          title="Error Text"
          description="Error Description Error Description Error Description Error Description"
          type="error"
        />
      )}

      {props.state === "success" && (
        <Alert
          title="Success Text"
          description="Success Description Success Description Success Description"
          type="success"
        />
      )}
    </>
  )
}

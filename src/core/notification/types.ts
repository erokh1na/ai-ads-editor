import type { notification } from "antd"
import type { ArgsProps } from "antd/es/notification"

export type NotificationType = "success" | "error"

export type NotificationContextType = {
  notification: typeof notification
  open: (type: NotificationType, cb: (config: { close: () => void }) => ArgsProps) => () => void
  closeAll: () => void
}

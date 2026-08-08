import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons"
import { ConfigProvider, notification } from "antd"
import type { ArgsProps } from "antd/es/notification"
import clsx from "clsx"
import type { PropsWithChildren } from "react"
import { createContext, useContext, useEffect } from "react"
import styles from "./notification.module.scss"
import type { NotificationContextType, NotificationType } from "./types"

const NotificationMainContext = createContext<NotificationContextType>(null!)

export function NotificationProvider({ children }: PropsWithChildren) {
  const [api, contextHolder] = notification.useNotification()

  function open(type: NotificationType, cb: (config: { close: () => void }) => ArgsProps) {
    const key = `notify${Date.now()}`
    const close = () => api.destroy(key)
    const customConfig = cb({ close })

    let suffixIcon

    switch (type) {
      case "success":
        suffixIcon = <CheckCircleOutlined />
        break
      case "error":
        suffixIcon = <WarningOutlined />
        break
    }

    api.open({
      key,
      closeIcon: null,
      duration: 2,
      placement: "topRight",
      icon: suffixIcon,
      ...customConfig,
      className: clsx(styles.notification, styles[`notification-${type}`], customConfig.className),
    })

    return close
  }

  useEffect(() => {
    return () => api.destroy()
  }, [api])

  function closeAll() {
    api.destroy()
  }

  const contextValue: NotificationContextType = {
    notification,
    open,
    closeAll,
  }

  return (
    <ConfigProvider>
      <NotificationMainContext.Provider value={contextValue}>
        {contextHolder}
        {children}
      </NotificationMainContext.Provider>
    </ConfigProvider>
  )
}

export function useNotificationMainContext() {
  return useContext(NotificationMainContext)
}

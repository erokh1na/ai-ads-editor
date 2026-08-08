import { NotificationProvider } from "@/core/notification"
import { Layout } from "antd"
import { Outlet } from "react-router"
import styles from "./layout-main.module.scss"

const { Content } = Layout

export const LayoutMain = () => {
  return (
    <NotificationProvider>
      <Layout className={styles.layout}>
        <Content className={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </NotificationProvider>
  )
}

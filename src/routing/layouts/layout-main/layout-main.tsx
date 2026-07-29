import { Layout } from "antd"
import { Outlet } from "react-router"
import styles from "./layout-main.module.scss"

const { Content } = Layout

export const LayoutMain = () => {
  return (
    <Layout className={styles.layout}>
      <Content className={styles.content}>
        <Outlet />
      </Content>
    </Layout>
  )
}

import { AdDetail } from "@/modules/ads/drivers/features"
import { ArrowLeftOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { useNavigate } from "react-router"
import styles from "./page-ad.module.scss"

export const PageAd = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.wrapper}>
      <Button
        className={styles.back}
        shape="circle"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/")}
      />
      <div className={styles.page}>
        <AdDetail />
      </div>
    </div>
  )
}

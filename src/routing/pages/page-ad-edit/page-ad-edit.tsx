import { AdEditForm } from "@/modules/ads/drivers/features"
import { ArrowLeftOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { useNavigate, useParams } from "react-router"
import styles from "./page-ad-edit.module.scss"

export const PageAdEdit = () => {
  const navigate = useNavigate()
  const params = useParams()

  return (
    <div className={styles.wrapper}>
      <Button
        className={styles.back}
        shape="circle"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(`/${params.id}`)}
      />
      <div className={styles.page}>
        <AdEditForm />
      </div>
    </div>
  )
}

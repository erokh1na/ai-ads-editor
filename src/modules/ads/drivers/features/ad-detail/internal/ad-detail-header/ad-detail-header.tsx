import { formatNumber } from "@/shared/utils"
import { formatDate } from "@/shared/utils/format-date"
import { EditOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { useNavigate, useParams } from "react-router"
import style from "./ad-detail-header.module.scss"
import type { AdDetailHeaderProps } from "./types"

export const AdDetailHeader = (props: AdDetailHeaderProps) => {
  const navigate = useNavigate()
  const params = useParams()

  return (
    <div className={style.header}>
      <div className={style.column}>
        <h1 className={style.title}>{props.item.title}</h1>
        <Button
          className={style.button}
          type="primary"
          icon={<EditOutlined />}
          iconPlacement="end"
          onClick={() => navigate(`/${params.id}/edit`)}
        >
          Редактировать
        </Button>
      </div>
      <div className={style.column}>
        {props.item.price && <p className={style.price}>{`${formatNumber(props.item.price)} ₽`}</p>}
        <div className={style.dates}>
          {props.item.createdAt && (
            <div className={style.date}>
              <span>Опубликовано: </span>
              <time dateTime={props.item.createdAt}>{formatDate(props.item.createdAt)}</time>
            </div>
          )}
          {props.item.updatedAt && (
            <div className={style.date}>
              <span>Отредактировано: </span>
              <time dateTime={props.item.updatedAt}>{formatDate(props.item.updatedAt)}</time>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

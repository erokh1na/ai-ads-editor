import { useAiGeneratePrice } from "@/modules/ai/applications/usecases/ai-generate-price-usecase.ts"
import { formatNumber } from "@/shared/utils"
import { BulbOutlined, LoadingOutlined, ReloadOutlined } from "@ant-design/icons"
import { Button, Popover } from "antd"
import styles from "./ai-price-popover.module.scss"

export const AiPricePopover = () => {
  const price = useAiGeneratePrice()

  const buttonState = {
    start: { icon: <BulbOutlined />, text: "Улучшить" },
    loading: { icon: <LoadingOutlined />, text: "Выполняется запрос" },
    retry: { icon: <ReloadOutlined />, text: "Повторить" },
  }

  return (
    <Popover
      content={
        <div className={styles.popover}>
          <p>Ответ Ai:</p>
          <p>{`${formatNumber(price.data.price)} ₽`}</p>
          <p>{price.data.reason}</p>
          <div className={styles.buttons}>
            <Button type="primary" onClick={price.apply}>
              Применить
            </Button>
            <Button onClick={price.close}>Закрыть</Button>
          </div>
        </div>
      }
      open={price.isOpen}
      onOpenChange={(nextOpen) => !nextOpen && price.close()}
      placement="top"
      trigger="click"
    >
      <Button
        icon={buttonState[price.phase].icon}
        className={styles.button}
        onClick={price.generate}
        color="orange"
        variant="filled"
      >
        {buttonState[price.phase].text}
      </Button>
    </Popover>
  )
}

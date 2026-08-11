import { useAiGenerateDescription } from "@/modules/ai/applications/usecases"
import { BulbOutlined, LoadingOutlined, ReloadOutlined } from "@ant-design/icons"
import { Button, Popover } from "antd"
import styles from "./ai-description-popover.module.scss"

export const AiDescriptionPopover = () => {
  const description = useAiGenerateDescription()

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
          <p>{description.data}</p>
          <div className={styles.buttons}>
            <Button type="primary" onClick={description.apply}>
              Применить
            </Button>
            <Button onClick={description.close}>Закрыть</Button>
          </div>
        </div>
      }
      open={description.isOpen}
      onOpenChange={(nextOpen) => !nextOpen && description.close()}
      placement="top"
      trigger="click"
    >
      <Button
        icon={buttonState[description.phase].icon}
        className={styles.button}
        onClick={description.generate}
        color="orange"
        variant="filled"
      >
        {buttonState[description.phase].text}
      </Button>
    </Popover>
  )
}

import { useContext } from 'react'
import { ConfirmContext, ConfirmConfigType } from '../contexts/ConfirmContext'

type ConfirmType = {
  confirm: (config: ConfirmConfigType) => Promise<boolean>
}

export function useConfirm(): ConfirmType {
  const { openConfirm, closeConfirm } = useContext(ConfirmContext)

  const confirm = ({
    icon,
    title,
    message,
    okText,
    onOkClick,
    cancelText,
    onCancelClick
  }: ConfirmConfigType) => {
    return new Promise<boolean>((resolve) => {
      const onOk = () => {
        closeConfirm()
        resolve(true)

        if (onOkClick) onOkClick()
      }

      const onCancel = () => {
        closeConfirm()
        resolve(false)

        if (onCancelClick) onCancelClick()
      }

      openConfirm({
        icon,
        title,
        message,
        okText,
        onOkClick: onOk,
        cancelText,
        onCancelClick: onCancel
      })
    })
  }

  return { confirm }
}

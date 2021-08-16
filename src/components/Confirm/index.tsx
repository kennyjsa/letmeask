import { useState } from 'react'
import { Modal } from '../Modal'
import './style.scss'

type ConfirmProps = {
  icon?: React.ReactNode
  title?: string
  message?: string
  okText?: string
  onOk?: () => void
  cancelText?: string
  onCancel?: () => void
}

export const Confirm: React.FC<ConfirmProps> = ({
  icon,
  title,
  message,
  okText = 'OK',
  onOk,
  cancelText = 'Cancelar',
  onCancel
}) => {
  const [isOpen, setIsOpen] = useState(true)

  const handleCancel = () => {
    setIsOpen(false)

    if (onCancel) {
      onCancel()
    }
  }

  const handleOk = () => {
    setIsOpen(false)

    if (onOk) {
      onOk()
    }
  }

  return (
    <Modal isOpen={isOpen}>
      <div className="confirm">
        {icon && <div className="confirm-icon">{icon}</div>}
        {title && <div className="confirm-title">{title}</div>}
        {message && <div className="confirm-message">{message}</div>}
        <div className="confirm-footer">
          <button onClick={handleCancel} className="button cancel">
            {cancelText}
          </button>
          <button onClick={handleOk} className="button ok">
            {okText}
          </button>
        </div>
      </div>
    </Modal>
  )
}

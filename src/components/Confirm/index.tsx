import { Modal } from '../Modal'
import './style.scss'

type ConfirmProps = {
  icon?: React.ReactNode
  title?: string
  message?: string
}

export const Confirm: React.FC<ConfirmProps> = ({ icon, title, message }) => {
  return (
    <Modal isOpen={true}>
      <div className="confirm">
        <div className="confirm-icon">{icon}</div>
        <div className="confirm-title">{title}</div>
        <div className="confirm-message">{message}</div>
        <div className="confirm-footer">
          <button className="button cancel">Cancelar</button>
          <button className="button ok">Sim, excluir</button>
        </div>
      </div>
    </Modal>
  )
}

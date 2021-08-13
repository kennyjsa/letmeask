import { ReactNode } from 'react'
import ReactModal from 'react-modal'

import './style.scss'

type ModalProps = {
  isOpen: boolean
  onAfterOpen: () => void
  onRequestClose: () => void
  title: string
  children?: ReactNode
}

export function Modal({
  isOpen,
  onAfterOpen,
  onRequestClose,
  title,
  children
}: ModalProps) {
  return (
    <ReactModal
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      onRequestClose={onRequestClose}
      contentLabel={title}
    >
      <div className="modal-title">{title}</div>
      {children}
    </ReactModal>
  )
}
import React from 'react'
import ReactModal from 'react-modal'

import './style.scss'

type ModalProps = {
  isOpen: boolean
  onAfterOpen?: () => void
  onRequestClose?: () => void
  title?: string
  children?: React.ReactNode
}

ReactModal.setAppElement('#root')

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onAfterOpen,
  onRequestClose,
  title,
  children
}: ModalProps) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      onRequestClose={onRequestClose}
      contentLabel={title}
      className="modal"
      overlayClassName="modal-overlay"
      closeTimeoutMS={500}
    >
      <div className="modal-title">{title}</div>
      {children}
    </ReactModal>
  )
}

import React, { createContext, ReactNode, useState } from 'react'
import { Confirm } from '../components/Confirm'

export type ConfirmConfigType = {
  icon: ReactNode
  title: string
  message: string

  okText: string
  onOkClick?: () => void

  cancelText: string
  onCancelClick?: () => void
}

export type ConfirmContextType = {
  isOpen: boolean
  openConfirm: (config: ConfirmConfigType) => void
  closeConfirm: () => void
}

export const ConfirmContext = createContext({} as ConfirmContextType)

export const ConfirmContextProvider: React.FC = ({ children }) => {
  const [config, setConfig] = useState<ConfirmConfigType | null>(null)

  const openConfirm = (config: ConfirmConfigType) => {
    setConfig(config)
  }

  const closeConfirm = () => {
    setConfig(null)
  }

  return (
    <ConfirmContext.Provider
      value={{ isOpen: !!config, openConfirm, closeConfirm }}
    >
      {!!config && (
        <Confirm
          icon={config.icon}
          title={config.title}
          message={config.message}
          okText={config.okText}
          onOk={config.onOkClick}
          cancelText={config.cancelText}
          onCancel={config.onCancelClick}
        />
      )}
      {children}
    </ConfirmContext.Provider>
  )
}

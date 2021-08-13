import './style.scss'

type ConfirmProps = {
  message: string
}

export function Comfirm({ message }: ConfirmProps) {
  return <div id="empty-box">{message}</div>
}

import './style.scss'

type EmptyBoxProps = {
  message: string
}

export const EmptyBox: React.FC<EmptyBoxProps> = ({ message }) => {
  return <div id="empty-box">{message}</div>
}

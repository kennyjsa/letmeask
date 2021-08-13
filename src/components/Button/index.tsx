import { ButtonHTMLAttributes } from 'react'

import './style.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  isOutlined = false,
  ...props
}: ButtonProps) => {
  return (
    <button className={`button ${isOutlined ? 'outlined' : ''}`} {...props} />
  )
}

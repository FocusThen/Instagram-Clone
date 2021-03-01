import React, { FC, ButtonHTMLAttributes } from 'react'
import classNames from 'classnames'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  className?: string
  disabled?: boolean
}

const Button: FC<ButtonProps> = ({
  children,
  className,
  disabled,
  ...restProps
}) => {
  const buttonClasses = classNames(
    'bg-blue-500 text-white w-full rounded h-8 font-bold',
    { 'cursor-not-allowed disabled:opacity-50': disabled },
    className
  )
  return (
    <button className={buttonClasses} disabled={disabled} {...restProps}>
      {children}
    </button>
  )
}

export default Button

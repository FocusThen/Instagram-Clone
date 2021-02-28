import React, { InputHTMLAttributes } from 'react'
import classNames from 'classnames'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  error?: boolean
  errorMessage?: string
}

export default React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, error, errorMessage, ...restProps }: InputProps,
  ref
): JSX.Element {
  const inputClasses = classNames(
    'text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2 focus:outline-none focus:ring-1 focus:ring-blue-500',
    { 'border-red-500': error },
    className
  )
  return (
    <>
      <input ref={ref} className={inputClasses} {...restProps} />
      {error && errorMessage && (
        <span className="text-red-500 text-sm font-medium">{errorMessage}</span>
      )}
    </>
  )
})

import type { InputHTMLAttributes } from 'react'
import clsx from 'clsx'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

const Input = ({ label, className, ...props }: InputProps) => {
  return (
    <label className="tt-input-group">
      {label && <span className="tt-input-label">{label}</span>}
      <input className={clsx('tt-input', className)} {...props} />
    </label>
  )
}

export default Input

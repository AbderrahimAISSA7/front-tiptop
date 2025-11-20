import type { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'danger'
  fullWidth?: boolean
}

const Button = ({ children, variant = 'primary', fullWidth, className, ...props }: ButtonProps) => {
  return (
    <button
      className={clsx(
        'tt-btn',
        variant === 'primary' && 'tt-btn-primary',
        variant === 'ghost' && 'tt-btn-ghost',
        variant === 'danger' && 'tt-btn-danger',
        fullWidth && 'tt-btn-full',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button

import { ComponentProps } from 'react'

import css from './Button.module.css'

export interface IButton extends ComponentProps<'button'> {
  icon?: JSX.Element
  buttonType?: 'text' | 'primary'
}

export const Button = ({
  children,
  buttonType,
  icon,
  className,
  ...rest
}: IButton) => {
  return (
    <button
      {...rest}
      className={`${css.button} ${buttonType === 'text' ? css.text : ''} ${className}`}>
      {icon && <span className={css['button-icon']}>{icon}</span>}
      {children && <span className={css['inner-button']}>{children}</span>}
    </button>
  )
}

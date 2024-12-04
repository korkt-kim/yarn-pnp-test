import { ComponentProps } from 'react'

import css from './Button.module.css'

export interface IButton extends Omit<ComponentProps<'button'>, 'type'> {
  icon?: JSX.Element
  type?: 'text' | 'primary'
}

export const Button = ({ children, type, icon, ...rest }: IButton) => {
  return (
    <button
      className={`${css.button} ${type === 'text' ? css.text : ''}`}
      {...rest}>
      {icon && <span className={css['button-icon']}>{icon}</span>}
      {children && <span className={css['inner-button']}>{children}</span>}
    </button>
  )
}

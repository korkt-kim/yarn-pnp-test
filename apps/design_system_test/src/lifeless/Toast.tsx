import './Toast.css'

import type { AriaToastProps } from '@react-aria/toast'
import { useToast } from '@react-aria/toast'
import { ToastState } from '@react-stately/toast'
import { useRef } from 'react'
// Reuse the Button from your component library. See below for details.

interface IToastProps<T> extends AriaToastProps<T> {
  state: ToastState<T>
}

export const Toast = <T extends React.ReactNode>({
  state,
  ...props
}: IToastProps<T>) => {
  const ref = useRef(null)
  const { toastProps, contentProps, titleProps, closeButtonProps } = useToast(
    props,
    state,
    ref
  )

  return (
    <div {...toastProps} ref={ref} className='toast'>
      <div {...contentProps}>
        <div {...titleProps}>{props.toast.content}</div>
      </div>
      <button {...closeButtonProps}>x</button>
    </div>
  )
}

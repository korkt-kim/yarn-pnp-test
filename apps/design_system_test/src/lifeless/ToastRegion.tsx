import './Toast.css'

import type { AriaToastRegionProps } from '@react-aria/toast'
import { useToastRegion } from '@react-aria/toast'
import type { ToastState } from '@react-stately/toast'
import { useRef } from 'react'

import { Toast } from './Toast'

export interface IToastRegion<T> extends AriaToastRegionProps {
  state: ToastState<T>
}

export const ToastRegion = <T extends React.ReactNode>({
  state,
  ...props
}: IToastRegion<T>) => {
  const ref = useRef(null)
  const { regionProps } = useToastRegion(props, state, ref)

  return (
    <div {...regionProps} ref={ref} className='toast-region'>
      {state.visibleToasts.map(toast => (
        <Toast key={toast.key} toast={toast} state={state} />
      ))}
    </div>
  )
}

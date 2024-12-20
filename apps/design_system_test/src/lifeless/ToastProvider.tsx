import './Toast.css'

import { ToastState, useToastState } from '@react-stately/toast'
import type { ReactNode } from 'react'

import { ToastRegion } from './ToastRegion'

export const ToastProvider = ({
  children,
  ...props
}: {
  children: (state: ToastState<unknown>) => ReactNode
}) => {
  const state = useToastState<ReactNode>({
    maxVisibleToasts: 5,
  })

  return (
    <>
      {children(state)}
      {state.visibleToasts.length > 0 && (
        <ToastRegion {...props} state={state} />
      )}
    </>
  )
}

import { createContext, ReactNode, useCallback, useMemo, useState } from 'react'
import { IModalContext2 } from './types'

export const ModalContext = createContext<{
  modals: IModalContext2[]
  closeDialog: () => void
  openDialog: (component: IModalContext2['component']) => void
}>({
  modals: [],
  closeDialog: () => {},
  openDialog: () => {},
})

export const useModalStore = () => {
  const [modals, setModals] = useState<IModalContext2[]>([])

  const openDialog = useCallback((component: IModalContext2['component']) => {
    setModals(prev => [...prev, { open: true, component }])
  }, [])

  const closeDialog = useCallback(() => {
    setModals(prev => {
      const last = prev.pop()

      if (!last) {
        return [...prev]
      }

      return [...prev, { ...last, open: false }]
    })
  }, [])

  const Provider = ({ children }: { children?: ReactNode }) => (
    <ModalContext.Provider
      value={useMemo(
        () => ({ modals, closeDialog, openDialog }),
        [modals, closeDialog, openDialog]
      )}>
      {children}
    </ModalContext.Provider>
  )

  return { Provider }
}

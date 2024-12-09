import { useContext } from 'react'
import { ModalContext } from './useModalStore'

export const useModalControl = () => {
  const { closeDialog } = useContext(ModalContext)

  return { closeDialog }
}

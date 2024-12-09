import { useContext } from 'react'
import { Dialog } from '../../ui/Modal'

import { ModalContext } from './useModalStore'

export const useModal = () => {
  const { modals, openDialog } = useContext(ModalContext)

  const ModalArea = modals.map((modal, index) => {
    return (
      <Dialog key={index} open={modal.open}>
        {modal.component}
      </Dialog>
    )
  })

  return { openDialog, ModalArea }
}

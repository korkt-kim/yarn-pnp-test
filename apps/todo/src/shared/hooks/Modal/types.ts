import { Dispatch, ReactNode, SetStateAction } from 'react'

export interface IModalContext {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export interface IModalContext2 {
  open: boolean
  component: ReactNode
}

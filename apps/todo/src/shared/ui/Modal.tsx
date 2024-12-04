import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import * as React from 'react'

import css from './Modal.module.css'

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ ...props }, ref) => (
  <DialogPrimitive.Overlay ref={ref} className={css.overlay} {...props} />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content ref={ref} className={css.content} {...props}>
      {children}
      <DialogPrimitive.Close className={css['close-button']}>
        <X style={{ height: '4px', width: '4px' }} />
        <span className='sr-only'>Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({ ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={css['heading-container']} {...props} />
)
DialogHeader.displayName = 'DialogHeader'

const DialogFooter = ({ ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={css['button-container']} {...props} />
)
DialogFooter.displayName = 'DialogFooter'

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ ...props }, ref) => (
  <DialogPrimitive.Title ref={ref} className={css.heading} {...props} />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={css.description}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}

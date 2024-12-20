// HTML
/**
 * This is like headless UI but is unstyled; functioning bones.
 * No brains, no heart, no skin.
 * While checking out headless UI libraries, if they're unstyled, I'd put them in this category.
 */
// 기능과 스타일을 넣어줘야한다.

// 스타일
import './Toast.css'

import { createToaster, Toast, Toaster } from '@ark-ui/react'

// 기능. 기능만 밖으로 빠져있어서 직접 추가해야함.
const toaster = createToaster({
  placement: 'bottom-end',
  overlap: true,
  gap: 24,
  duration: 100000,
})

export const SkinlessToast = () => {
  return (
    <div>
      <button
        type='button'
        onClick={() =>
          toaster.create({
            title: 'Toast Title',
            description: 'Toast Description',
            type: 'info',
          })
        }>
        Add Toast
      </button>
      <Toaster toaster={toaster}>
        {toast => (
          <Toast.Root key={toast.id}>
            <Toast.Title>{toast.title}</Toast.Title>
            <Toast.Description>{toast.description}</Toast.Description>
            <Toast.CloseTrigger>X</Toast.CloseTrigger>
          </Toast.Root>
        )}
      </Toaster>
    </div>
  )
}

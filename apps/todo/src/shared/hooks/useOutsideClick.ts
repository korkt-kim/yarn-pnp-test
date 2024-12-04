import { MutableRefObject, useEffect } from 'react'

export const useOutsideClick = <T extends HTMLElement | null>(
  ref: MutableRefObject<T>,
  handler: (e: MouseEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return
      }
      handler(event)
    }

    document.addEventListener('mousedown', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
    }
  }, [ref, handler])
}

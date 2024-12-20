// HTML + JS
/**
 * This is the one term in this post that is common jargon amongst front-end developers.
 * There's even a whole library that tries to embody (heh, see what I did there) the category: HeadlessUI.
 */
// 스타일을 넎어줘야한다.
// 스타일
import './styles.css'

import * as Toast from '@radix-ui/react-toast'
import * as React from 'react'

function oneWeekAway() {
  const now = new Date()
  const inOneWeek = now.setDate(now.getDate() + 7)
  return new Date(inOneWeek)
}

function prettyDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(date)
}

export const HeadlessToast = () => {
  const [open, setOpen] = React.useState(false)
  const eventDateRef = React.useRef(new Date())
  const timerRef = React.useRef(0)

  React.useEffect(() => {
    return () => clearTimeout(timerRef.current)
  }, [])

  return (
    // 기능과 HTML이 라이브러리에 내재되어 있음.
    <Toast.Provider swipeDirection='right'>
      <button
        className='Button large violet'
        onClick={() => {
          setOpen(false)
          window.clearTimeout(timerRef.current)
          timerRef.current = window.setTimeout(() => {
            eventDateRef.current = oneWeekAway()
            setOpen(true)
          }, 100)
        }}>
        Add to calendar
      </button>

      <Toast.Root className='ToastRoot' open={open} onOpenChange={setOpen}>
        <Toast.Title className='ToastTitle'>Scheduled: Catch up</Toast.Title>
        <Toast.Description asChild>
          <time
            className='ToastDescription'
            dateTime={eventDateRef.current.toISOString()}>
            {prettyDate(eventDateRef.current)}
          </time>
        </Toast.Description>
        <Toast.Action
          className='ToastAction'
          asChild
          altText='Goto schedule to undo'>
          <button className='Button small green'>Undo</button>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className='ToastViewport' />
    </Toast.Provider>
  )
}

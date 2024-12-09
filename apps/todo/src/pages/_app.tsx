import './styles/globals.css'

import { NextPageWithLayout } from 'next'
import type { AppProps } from 'next/app'
import { ReactNode } from 'react'
import { ReactQueryClientProvider } from '@/app/providers/ReactQueryClientProvider'
import { useModalStore } from '@/shared/hooks/Modal/useModalStore'

export default function App({ Component, pageProps }: AppProps) {
  // Use the layout defined at the page level, if available
  const { Provider: ModalProvider } = useModalStore()
  const getLayout =
    (Component as NextPageWithLayout).getLayout || ((page: ReactNode) => page)

  return (
    <ReactQueryClientProvider>
      <ModalProvider>{getLayout(<Component {...pageProps} />)}</ModalProvider>
    </ReactQueryClientProvider>
  )
}

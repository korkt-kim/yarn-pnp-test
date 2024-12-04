import './styles/globals.css'

import { NextPageWithLayout } from 'next'
import type { AppProps } from 'next/app'
import { ReactNode } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  // Use the layout defined at the page level, if available
  const getLayout =
    (Component as NextPageWithLayout).getLayout || ((page: ReactNode) => page)

  return getLayout(<Component {...pageProps} />)
}

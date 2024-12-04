import type { NextPage } from 'next'

declare module 'next' {
  export declare type NextPageWithLayout<
    P = Record<string, unknown>,
    IP = P,
  > = NextPage<P, IP> & {
    getLayout: (component: JSX.Element) => JSX.Element
  }
}

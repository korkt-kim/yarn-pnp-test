import { Dashboard } from '@mui/icons-material'
import { Divider, Grid2, Typography } from '@mui/material'
import { PropsWithChildren } from 'react'
import { Link } from 'react-router'

export interface IAppShell extends PropsWithChildren {
  noHeader?: boolean
  noFooter?: boolean
  noSidebar?: boolean
}

const Sidebar = () => {
  return <Grid2></Grid2>
}

const Header = () => {
  return (
    <Grid2 container justifyContent='space-between'>
      <Grid2 container alignItems='center'>
        <Dashboard />
        <img
          style={{ display: 'block' }}
          src='/Header-logo.svg'
          alt='Wise Guys Beer'
          width='150'
          height='30'
        />
      </Grid2>
      <Link to='https://www.daum.net'>LogIn</Link>
    </Grid2>
  )
}

const Footer = () => {
  return (
    <Grid2 container justifyContent='center' alignItems='center' gap='18px'>
      <Typography>
        Product by <Link to='www.naver.com'>Naver</Link>{' '}
      </Typography>
      <Divider orientation='vertical' flexItem />
      <Typography>Document FAQ Contact © 2024, NAVER.</Typography>
    </Grid2>
  )
}

export const AppShell = ({
  noHeader,
  noFooter,
  noSidebar,
  children,
}: IAppShell) => {
  return (
    <Grid2 direction='column' gap={10}>
      {!noHeader && <Header />}
      <Grid2>
        {!noSidebar && <Sidebar />}
        {children}
      </Grid2>

      {!noFooter && <Footer />}
    </Grid2>
  )
}

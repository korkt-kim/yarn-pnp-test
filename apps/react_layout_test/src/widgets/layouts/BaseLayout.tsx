import { Outlet } from 'react-router'

import { AppShell } from './base/AppShell'
import { Mandatory } from './base/Madatory'

export const BaseLayout = () => {
  return (
    <Mandatory>
      <AppShell>
        <main>
          <Outlet />
        </main>
      </AppShell>
    </Mandatory>
  )
}

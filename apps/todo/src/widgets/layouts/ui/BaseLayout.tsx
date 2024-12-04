import { ReactElement } from 'react'

import css from './BaseLayout.module.css'

/**
 * ✅ FSD Best practice
 *
 * (1) Devide layout in two modules: dumb layout grid (shared)
 * and smart layout with widgets (this file)
 *
 * (2) Avoid cross-import using slot (render prop) pattern
 * Pass widgets as props to layout
 */
export const BaseLayout = (page: ReactElement) => (
  <div className={css.root}>
    <div className={css.title}>
      <h1>Todo List</h1>
    </div>
    {page}
  </div>
)

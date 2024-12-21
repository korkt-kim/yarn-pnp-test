import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'

import App from './App'
import { BaseLayout } from './widgets/layouts/BaseLayout'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <BrowserRouter>
    <Routes>
      <Route element={<BaseLayout />}>
        <Route path='/' element={<App />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

import './App.css'

import React from 'react'

import { HeadlessToast } from './headless/Toast'
import { ToastProvider } from './lifeless/ToastProvider'
import { SkinlessToast } from './skinless/Toast'

function App() {
  return (
    <div className='App'>
      <h3>Headless</h3>
      <HeadlessToast />
      <h3>Skinless</h3>
      <SkinlessToast />
      <h3>Lifeless</h3>
      <ToastProvider>
        {state => (
          <button onClick={() => state.add('Toast is done!')}>
            Show toast
          </button>
        )}
      </ToastProvider>
    </div>
  )
}

export default App

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { router } from './App'
import { RouterProvider } from 'react-router-dom'
import CartContextProvider from './context/contextApi'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CartContextProvider>
      <RouterProvider router={router} />
    </CartContextProvider>
  </React.StrictMode>,
)

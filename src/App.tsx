import { createBrowserRouter } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/home/Home'
import Cart from './pages/cart/Cart'
import NotFound from './pages/notFound/NotFound'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
])

export { router }
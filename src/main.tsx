import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import 'common-styles/styles.css'

import Footer from './components/Footer'
import isMobile from './utilities/is-mobile'
import router from './router'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className={isMobile() ? 'page-mobile' : 'page'}>
      <RouterProvider router={router} />
    </div>
    <Footer />
  </React.StrictMode>
)

import { createBrowserRouter } from 'react-router-dom'

import Index from '../pages/index'
import SignUp from '../pages/sign-up'

const router = createBrowserRouter([
  {
    element: <Index />,
    path: '/',
  },
  {
    element: <SignUp />,
    path: '/sign-up',
  },
]);

export default router;

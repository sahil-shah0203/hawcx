import { createBrowserRouter } from 'react-router-dom'

import Index from '../pages/index/Index'
import SignUp from '../pages/sign-up/SignUp'

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

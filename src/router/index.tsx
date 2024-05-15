import { createBrowserRouter } from 'react-router-dom'

import { ROUTES } from '../constants';

import Home from '../pages/home';
import Index from '../pages/index'
import SignUp from '../pages/sign-up'

const router = createBrowserRouter([
  {
    element: <Index />,
    path: ROUTES.index,
  },
  {
    element: <Home />,
    path: ROUTES.home,
  },
  {
    element: <SignUp />,
    path: ROUTES.signUp,
  },
]);

export default router;

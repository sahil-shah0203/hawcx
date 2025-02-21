import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "../constants";

import Home from "../pages/home";
import Index from "../pages/index";
import SignUp from "../pages/sign-up";
import Auth from "../pages/Auth/Auth"; // Import new authentication page

const router = createBrowserRouter([
  { element: <Index />, path: ROUTES.index },
  { element: <Home />, path: ROUTES.home },
  { element: <SignUp />, path: ROUTES.signUp },
  { element: <Auth />, path: ROUTES.auth }, // New authentication page
]);

export default router;

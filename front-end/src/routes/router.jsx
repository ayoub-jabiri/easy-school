import { createBrowserRouter } from "react-router";
import LandingPage from "../pages/landing-page/LandingPage";
import LoginPage from "../pages/login-page/LoginPage";

// import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    // {
    //     path: "*",
    //     element: (
    //         <AppLaout>
    //             <NotFound />
    //         </AppLaout>
    //     ),
    // },
]);

export default router;

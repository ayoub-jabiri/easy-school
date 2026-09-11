import { createBrowserRouter } from "react-router";
import LandingPage from "../pages/landing-page/LandingPage";

// import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
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

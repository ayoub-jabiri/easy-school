import { createBrowserRouter } from "react-router";
import LandingPage from "../pages/landing-page/LandingPage";
import LoginPage from "../pages/login-page/LoginPage";
import AppLayout from "../components/layout/AppLayout";
import DashboardPage from "../pages/dashboard/DashboardPage";
import UsersPage from "../pages/users/UsersPage";
import GuardiansPage from "../pages/guardians/GuardiansPage";

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
    {
        path: "/dashboard",
        element: (
            <AppLayout activeHref="/dashboard">
                <DashboardPage />
            </AppLayout>
        ),
    },
    {
        path: "/users",
        element: (
            <AppLayout activeHref="/users">
                <UsersPage />
            </AppLayout>
        ),
    },
    {
        path: "/guardians",
        element: (
            <AppLayout activeHref="/guardians">
                <GuardiansPage />
            </AppLayout>
        ),
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

import { createBrowserRouter } from "react-router";
import LandingPage from "../pages/landing-page/LandingPage";
import LoginPage from "../pages/login-page/LoginPage";
import AppLayout from "../components/layout/AppLayout";
import DashboardPage from "../pages/dashboard/DashboardPage";
import UsersPage from "../pages/users/UsersPage";
import GuardiansPage from "../pages/guardians/GuardiansPage";
import UserDetailsPage from "../pages/users/UserDetailsPage";
import SubjectsPage from "../pages/subjects/SubjectsPage";
import RoomsPage from "../pages/rooms/RoomsPage";
import ClassesPage from "../pages/classes/ClassesPage";
import ClassDetailsPage from "../pages/classes/ClassDetailsPage";
import HomeworkPage from "../pages/homework/HomeworkPage";
import HomeworkDetailsPage from "../pages/homework/HomeworkDetailsPage";
import GradesPage from "../pages/grades/GradesPage";
import GradeDetailsPage from "../pages/grades/GradeDetailsPage";
import AnnouncementsPage from "../pages/announcements/AnnouncementsPage";

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
        path: "/users/:id",
        element: (
            <AppLayout activeHref="/users">
                <UserDetailsPage />
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
    {
        path: "/subjects",
        element: (
            <AppLayout activeHref="/subjects">
                <SubjectsPage />
            </AppLayout>
        ),
    },
    {
        path: "/school-rooms",
        element: (
            <AppLayout activeHref="/school-rooms">
                <RoomsPage />
            </AppLayout>
        ),
    },
    {
        path: "/classes",
        element: (
            <AppLayout activeHref="/classes">
                <ClassesPage />
            </AppLayout>
        ),
    },
    {
        path: "/classes/:id",
        element: (
            <AppLayout activeHref="/classes">
                <ClassDetailsPage />
            </AppLayout>
        ),
    },
    {
        path: "/homework",
        element: (
            <AppLayout activeHref="/homework">
                <HomeworkPage />
            </AppLayout>
        ),
    },
    {
        path: "/homework/:id",
        element: (
            <AppLayout activeHref="/homework">
                <HomeworkDetailsPage />
            </AppLayout>
        ),
    },
    {
        path: "/grades",
        element: (
            <AppLayout activeHref="/grades">
                <GradesPage />
            </AppLayout>
        ),
    },
    {
        path: "/grades/:id",
        element: (
            <AppLayout activeHref="/grades">
                <GradeDetailsPage />
            </AppLayout>
        ),
    },
    {
        path: "/announcements",
        element: (
            <AppLayout activeHref="/announcements">
                <AnnouncementsPage />
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

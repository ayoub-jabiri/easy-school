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
import AnnouncementDetailsPage from "../pages/announcements/AnnouncementDetailsPage";
import ProfilePage from "../pages/profile/ProfilePage";
import NotFoundPage from "../pages/not-found/NotFoundPage";

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
            <AppLayout
                allowedRoles={["admin", "teacher", "student", "parent"]}
                activeHref="/dashboard"
            >
                <DashboardPage />
            </AppLayout>
        ),
    },
    {
        path: "/users",
        element: (
            <AppLayout allowedRoles={["admin"]} activeHref="/users">
                <UsersPage />
            </AppLayout>
        ),
    },
    {
        path: "/users/:id",
        element: (
            <AppLayout allowedRoles={["admin"]} activeHref="/users">
                <UserDetailsPage />
            </AppLayout>
        ),
    },
    {
        path: "/guardians",
        element: (
            <AppLayout allowedRoles={["admin"]} activeHref="/guardians">
                <GuardiansPage />
            </AppLayout>
        ),
    },
    {
        path: "/subjects",
        element: (
            <AppLayout
                allowedRoles={["admin", "teacher", "student", "parent"]}
                activeHref="/subjects"
            >
                <SubjectsPage />
            </AppLayout>
        ),
    },
    {
        path: "/school-rooms",
        element: (
            <AppLayout
                allowedRoles={["admin", "teacher", "student", "parent"]}
                activeHref="/school-rooms"
            >
                <RoomsPage />
            </AppLayout>
        ),
    },
    {
        path: "/classes",
        element: (
            <AppLayout
                allowedRoles={["admin", "teacher", "student", "parent"]}
                activeHref="/classes"
            >
                <ClassesPage />
            </AppLayout>
        ),
    },
    {
        path: "/classes/:id",
        element: (
            <AppLayout
                allowedRoles={["admin", "teacher", "student", "parent"]}
                activeHref="/classes"
            >
                <ClassDetailsPage />
            </AppLayout>
        ),
    },
    {
        path: "/homework",
        element: (
            <AppLayout
                allowedRoles={["admin", "teacher", "student", "parent"]}
                activeHref="/homework"
            >
                <HomeworkPage />
            </AppLayout>
        ),
    },
    {
        path: "/homework/:id",
        element: (
            <AppLayout
                allowedRoles={["admin", "teacher", "student", "parent"]}
                activeHref="/homework"
            >
                <HomeworkDetailsPage />
            </AppLayout>
        ),
    },
    {
        path: "/grades",
        element: (
            <AppLayout
                allowedRoles={["admin", "teacher", "student", "parent"]}
                activeHref="/grades"
            >
                <GradesPage />
            </AppLayout>
        ),
    },
    {
        path: "/grades/:id",
        element: (
            <AppLayout
                allowedRoles={["admin", "teacher", "student", "parent"]}
                activeHref="/grades"
            >
                <GradeDetailsPage />
            </AppLayout>
        ),
    },
    {
        path: "/announcements",
        element: (
            <AppLayout
                allowedRoles={["admin", "teacher", "student", "parent"]}
                activeHref="/announcements"
            >
                <AnnouncementsPage />
            </AppLayout>
        ),
    },
    {
        path: "/announcements/:id",
        element: (
            <AppLayout
                allowedRoles={["admin", "teacher", "student", "parent"]}
                activeHref="/announcements"
            >
                <AnnouncementDetailsPage />
            </AppLayout>
        ),
    },
    {
        path: "/profile",
        element: (
            <AppLayout
                allowedRoles={["admin", "teacher", "student", "parent"]}
                activeHref="/profile"
            >
                <ProfilePage />
            </AppLayout>
        ),
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);

export default router;

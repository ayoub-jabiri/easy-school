import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/auth.slice";
import alertReducer from "./slices/alert.slice";
import dashboardReducer from "./slices/dashboard.slice";
import usersReducer from "./slices/users.slice";
import guardianReducer from "./slices/guardian.slice";
import subjectsReducer from "./slices/subjects.slice";
import roomsReducer from "./slices/rooms.slice";
import classesReducer from "./slices/classes.slice";
import homeworkReducer from "./slices/homework.slice";
import gradesReducer from "./slices/grades.slice";
import announcementsReducer from "./slices/announcements.slice";

const store = configureStore({
    reducer: {
        user: userReducer,
        alert: alertReducer,
        dashboard: dashboardReducer,
        users: usersReducer,
        guardians: guardianReducer,
        subjects: subjectsReducer,
        rooms: roomsReducer,
        classes: classesReducer,
        homework: homeworkReducer,
        grades: gradesReducer,
        announcements: announcementsReducer,
    },
});

export default store;

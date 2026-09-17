import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/auth.slice";
import alertReducer from "./slices/alert.slice";
import dashboardReducer from "./slices/dashboard.slice";
import usersReducer from "./slices/users.slice";
import guardianReducer from "./slices/guardian.slice";
import subjectsReducer from "./slices/subjects.slice";

const store = configureStore({
    reducer: {
        user: userReducer,
        alert: alertReducer,
        dashboard: dashboardReducer,
        users: usersReducer,
        guardians: guardianReducer,
        subjects: subjectsReducer,
    },
});

export default store;

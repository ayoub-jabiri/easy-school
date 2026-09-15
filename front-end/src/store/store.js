import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/auth.slice";
import alertReducer from "./slices/alert.slice";
import dashboardReducer from "./slices/dashboard.slice";

const store = configureStore({
    reducer: {
        user: userReducer,
        alert: alertReducer,
        dashboard: dashboardReducer,
    },
});

export default store;

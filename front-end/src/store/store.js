import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/auth.slice";
import alertReducer from "./slices/alert.slice";

const store = configureStore({
    reducer: {
        user: userReducer,
        alert: alertReducer,
    },
});

export default store;

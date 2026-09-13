import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
    name: "alert",
    initialState: {
        success: null,
        error: null,
    },
    reducers: {
        setSuccessAlert: (state, action) => {
            state.error = null;
            state.success = action.payload;
        },
        setErrorAlert: (state, action) => {
            state.success = null;
            state.error = action.payload;
        },
        clearAlerts(state) {
            state.success = null;
            state.error = null;
        },
    },
});

export const { setSuccessAlert, setErrorAlert, clearAlerts } =
    alertSlice.actions;

export default alertSlice.reducer;

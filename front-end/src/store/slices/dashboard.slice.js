import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios.instance";

export const getAdminDashboard = createAsyncThunk(
    "dashboard/getAdminDashboard",
    async (_, { rejectWithValue }) => {
        try {
            return await api.get("/dashboard/admin/stats");
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const initialState = {
    adminDashboardData: null,
    loading: false,
    error: null,
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Admin Dashboard
        builder
            .addCase(getAdminDashboard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAdminDashboard.fulfilled, (state, action) => {
                state.loading = false;
                state.adminDashboardData = action.payload;
                state.error = null;
            })
            .addCase(getAdminDashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default dashboardSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios.instance";

export const registerUser = createAsyncThunk(
    "users/registerUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await api.post("/users/auth/register", userData);

            return response;
        } catch (error) {
            let currentError = {
                message: error.response?.data?.message || "An error occurred",
                statusCode: error.response?.status,
            };

            if (error.response?.data?.errors) {
                currentError.errors = error.response?.data?.errors;
            }

            return rejectWithValue({
                ...currentError,
            });
        }
    }
);

const initialState = {
    message: null,
    registering: false,
    error: null,
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        clearUsersMessage(state) {
            state.message = null;
        },
        clearUsersError(state) {
            state.message = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Register User
        builder
            .addCase(registerUser.pending, (state) => {
                state.message = null;
                state.registering = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.message = action.payload.message;
                state.registering = false;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.message = null;
                state.registering = false;
                state.error = action.payload;
            });
    },
});

export const { clearUsersMessage, clearUsersError } = usersSlice.actions;

export default usersSlice.reducer;

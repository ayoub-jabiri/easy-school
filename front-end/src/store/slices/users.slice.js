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

export const getUsers = createAsyncThunk(
    "users/getUsers",
    async (params = {}, { rejectWithValue }) => {
        try {
            return await api.get("/users", {
                params,
            });
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const initialState = {
    registerData: {
        message: null,
        registering: false,
        error: null,
    },
    users: {
        data: null,
        loading: false,
        error: null,
    },
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        clearUsersMessage(state) {
            state.registerData.message = null;
        },
        clearUsersError(state) {
            state.registerData.error = null;
        },
    },
    extraReducers: (builder) => {
        // Register User
        builder
            .addCase(registerUser.pending, (state) => {
                state.registerData.message = null;
                state.registerData.registering = true;
                state.registerData.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.registerData.message = action.payload.message;
                state.registerData.registering = false;
                state.registerData.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.registerData.message = null;
                state.registerData.registering = false;
                state.registerData.error = action.payload;
            });

        // Get Users
        builder
            .addCase(getUsers.pending, (state) => {
                state.users.loading = true;
                state.users.error = null;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users.loading = false;
                state.users.data = action.payload;
                state.users.error = null;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.users.loading = false;
                state.users.error = action.payload;
            });
    },
});

export const { clearUsersMessage, clearUsersError } = usersSlice.actions;

export default usersSlice.reducer;

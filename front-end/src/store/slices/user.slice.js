import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        token: localStorage.getItem("accessToken") || null,
    },
});

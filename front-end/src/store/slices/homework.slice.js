import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios.instance";

export const getHomeworks = createAsyncThunk(
    "homework/getHomeworks",
    async (params = {}, { rejectWithValue }) => {
        try {
            return await api.get("/homeworks", { params });
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createHomework = createAsyncThunk(
    "homework/createHomework",
    async (homeworkData, { rejectWithValue }) => {
        try {
            const response = await api.post("/homeworks", homeworkData);

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

export const updateHomework = createAsyncThunk(
    "homework/updateHomework",
    async ({ homeworkId, ...homeworkData }, { rejectWithValue }) => {
        try {
            const response = await api.put(
                `/homeworks/${homeworkId}`,
                homeworkData
            );

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

export const deleteHomework = createAsyncThunk(
    "homework/deleteHomework",
    async (homeworkId, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/homeworks/${homeworkId}`);

            return { ...response, homeworkId };
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || "An error occurred",
                statusCode: error.response?.status,
            });
        }
    }
);

const initialState = {
    registerData: {
        message: null,
        registering: false,
        error: null,
    },
    deleteData: {
        message: null,
        deleting: false,
        error: null,
    },
    updateData: {
        message: null,
        updating: false,
        error: null,
    },
    homeworksList: {
        data: null,
        loading: false,
        error: null,
        tableActions: {
            search: "",
            classId: "",
            status: "",
            page: 1,
            limit: 15,
        },
    },
};

const homeworkSlice = createSlice({
    name: "homework",
    initialState,
    reducers: {
        clearHomeworkRegisterAlerts(state) {
            state.registerData.message = null;
            state.registerData.error = null;
        },
        clearHomeworkDeleteMessage(state) {
            state.deleteData.message = null;
        },
        clearHomeworkDeleteError(state) {
            state.deleteData.error = null;
        },
        clearHomeworkUpdateAlerts(state) {
            state.updateData.message = null;
            state.updateData.error = null;
        },
        handleTableActions(state, action) {
            const { key, value } = action.payload;

            switch (key) {
                case "search":
                    state.homeworksList.tableActions.search = value;
                    break;
                case "classId":
                    state.homeworksList.tableActions.classId = value;
                    break;
                case "status":
                    state.homeworksList.tableActions.status = value;
                    break;
                case "page":
                    state.homeworksList.tableActions.page = value;
                    break;
                case "limit":
                    state.homeworksList.tableActions.limit = value;
                    break;
                default:
                    break;
            }
        },
    },
    extraReducers: (builder) => {
        // Create Homework
        builder
            .addCase(createHomework.pending, (state) => {
                state.registerData.message = null;
                state.registerData.registering = true;
                state.registerData.error = null;
            })
            .addCase(createHomework.fulfilled, (state, action) => {
                state.registerData.message = action.payload.message;
                state.registerData.registering = false;
                state.registerData.error = null;
            })
            .addCase(createHomework.rejected, (state, action) => {
                state.registerData.message = null;
                state.registerData.registering = false;
                state.registerData.error = action.payload;
            });

        // Get Homeworks
        builder
            .addCase(getHomeworks.pending, (state) => {
                state.homeworksList.loading = true;
                state.homeworksList.error = null;
            })
            .addCase(getHomeworks.fulfilled, (state, action) => {
                state.homeworksList.loading = false;
                state.homeworksList.data = action.payload;
                state.homeworksList.error = null;
            })
            .addCase(getHomeworks.rejected, (state, action) => {
                state.homeworksList.loading = false;
                state.homeworksList.error = action.payload;
            });

        // Delete Homework
        builder
            .addCase(deleteHomework.pending, (state) => {
                state.deleteData.deleting = true;
                state.deleteData.message = null;
                state.deleteData.error = null;
            })
            .addCase(deleteHomework.fulfilled, (state, action) => {
                state.deleteData.deleting = false;
                state.deleteData.message = action.payload.message;
                state.deleteData.error = null;

                if (state.homeworksList.data?.homeworks) {
                    state.homeworksList.data.homeworks =
                        state.homeworksList.data.homeworks.filter(
                            (homework) =>
                                homework._id !== action.payload.homeworkId
                        );
                }
            })
            .addCase(deleteHomework.rejected, (state, action) => {
                state.deleteData.deleting = false;
                state.deleteData.message = null;
                state.deleteData.error = action.payload;
            });

        // Update Homework
        builder
            .addCase(updateHomework.pending, (state) => {
                state.updateData.updating = true;
                state.updateData.message = null;
                state.updateData.error = null;
            })
            .addCase(updateHomework.fulfilled, (state, action) => {
                state.updateData.updating = false;
                state.updateData.message = action.payload.message;
                state.updateData.error = null;
            })
            .addCase(updateHomework.rejected, (state, action) => {
                state.updateData.updating = false;
                state.updateData.message = null;
                state.updateData.error = action.payload;
            });
    },
});

export const {
    clearHomeworkRegisterAlerts,
    clearHomeworkDeleteMessage,
    clearHomeworkDeleteError,
    clearHomeworkUpdateAlerts,
    handleTableActions,
} = homeworkSlice.actions;

export default homeworkSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios.instance";

export const getGrades = createAsyncThunk(
    "grades/getGrades",
    async (params = {}, { rejectWithValue }) => {
        try {
            return await api.get("/grades", { params });
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getGradeById = createAsyncThunk(
    "grades/getGradeById",
    async (gradeId, { rejectWithValue }) => {
        try {
            return await api.get(`/grades/${gradeId}`);
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || "An error occurred",
                statusCode: error.response?.status,
            });
        }
    }
);

export const createGrade = createAsyncThunk(
    "grades/createGrade",
    async (gradeData, { rejectWithValue }) => {
        try {
            const response = await api.post("/grades", gradeData);

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

export const updateGrade = createAsyncThunk(
    "grades/updateGrade",
    async ({ gradeId, ...gradeData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/grades/${gradeId}`, gradeData);

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

export const deleteGrade = createAsyncThunk(
    "grades/deleteGrade",
    async (gradeId, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/grades/${gradeId}`);

            return { ...response, gradeId };
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
    gradesList: {
        data: null,
        loading: false,
        error: null,
        tableActions: {
            search: "",
            classId: "",
            studentId: "",
            subjectId: "",
            page: 1,
            limit: 15,
        },
    },
    gradeDetails: {
        data: null,
        loading: false,
        error: null,
    },
};

const gradesSlice = createSlice({
    name: "grades",
    initialState,
    reducers: {
        clearGradesRegisterAlerts(state) {
            state.registerData.message = null;
            state.registerData.error = null;
        },
        clearGradesDeleteAlerts(state) {
            state.deleteData.message = null;
            state.deleteData.error = null;
        },
        clearGradesUpdateAlerts(state) {
            state.updateData.message = null;
            state.updateData.error = null;
        },
        handleTableActions(state, action) {
            const { key, value } = action.payload;

            switch (key) {
                case "search":
                    state.gradesList.tableActions.search = value;
                    break;
                case "classId":
                    state.gradesList.tableActions.classId = value;
                    break;
                case "studentId":
                    state.gradesList.tableActions.studentId = value;
                    break;
                case "subjectId":
                    state.gradesList.tableActions.subjectId = value;
                    break;
                case "page":
                    state.gradesList.tableActions.page = value;
                    break;
                case "limit":
                    state.gradesList.tableActions.limit = value;
                    break;
                default:
                    break;
            }
        },
    },
    extraReducers: (builder) => {
        // Create Grade
        builder
            .addCase(createGrade.pending, (state) => {
                state.registerData.message = null;
                state.registerData.registering = true;
                state.registerData.error = null;
            })
            .addCase(createGrade.fulfilled, (state, action) => {
                state.registerData.message = action.payload.message;
                state.registerData.registering = false;
                state.registerData.error = null;
            })
            .addCase(createGrade.rejected, (state, action) => {
                state.registerData.message = null;
                state.registerData.registering = false;
                state.registerData.error = action.payload;
            });

        // Get Grades
        builder
            .addCase(getGrades.pending, (state) => {
                state.gradesList.loading = true;
                state.gradesList.error = null;
            })
            .addCase(getGrades.fulfilled, (state, action) => {
                state.gradesList.loading = false;
                state.gradesList.data = action.payload;
                state.gradesList.error = null;
            })
            .addCase(getGrades.rejected, (state, action) => {
                state.gradesList.loading = false;
                state.gradesList.error = action.payload;
            });

        // Get Grade By Id
        builder
            .addCase(getGradeById.pending, (state) => {
                state.gradeDetails.loading = true;
                state.gradeDetails.error = null;
            })
            .addCase(getGradeById.fulfilled, (state, action) => {
                state.gradeDetails.loading = false;
                state.gradeDetails.data = action.payload.grade;
                state.gradeDetails.error = null;
            })
            .addCase(getGradeById.rejected, (state, action) => {
                state.gradeDetails.loading = false;
                state.gradeDetails.error = action.payload;
            });

        // Delete Grade
        builder
            .addCase(deleteGrade.pending, (state) => {
                state.deleteData.deleting = true;
                state.deleteData.message = null;
                state.deleteData.error = null;
            })
            .addCase(deleteGrade.fulfilled, (state, action) => {
                state.deleteData.deleting = false;
                state.deleteData.message = action.payload.message;
                state.deleteData.error = null;

                if (state.gradesList.data?.grades) {
                    state.gradesList.data.grades =
                        state.gradesList.data.grades.filter(
                            (grade) => grade._id !== action.payload.gradeId
                        );
                }
            })
            .addCase(deleteGrade.rejected, (state, action) => {
                state.deleteData.deleting = false;
                state.deleteData.message = null;
                state.deleteData.error = action.payload;
            });

        // Update Grade
        builder
            .addCase(updateGrade.pending, (state) => {
                state.updateData.updating = true;
                state.updateData.message = null;
                state.updateData.error = null;
            })
            .addCase(updateGrade.fulfilled, (state, action) => {
                state.updateData.updating = false;
                state.updateData.message = action.payload.message;
                state.updateData.error = null;
            })
            .addCase(updateGrade.rejected, (state, action) => {
                state.updateData.updating = false;
                state.updateData.message = null;
                state.updateData.error = action.payload;
            });
    },
});

export const {
    clearGradesRegisterAlerts,
    clearGradesDeleteAlerts,
    clearGradesUpdateAlerts,
    handleTableActions,
} = gradesSlice.actions;

export default gradesSlice.reducer;

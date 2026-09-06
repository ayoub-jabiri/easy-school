import mongoose, { Schema, model } from "mongoose";

const gradeSchema = new Schema({
    grade: {
        type: Number,
        required: true,
        min: 0,
        max: 20,
    },
    evaluation: {
        type: String,
        required: true,
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default model("Grade", gradeSchema);

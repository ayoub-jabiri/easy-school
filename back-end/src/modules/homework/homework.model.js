import mongoose, { Schema, model } from "mongoose";

const homeworkSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
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

export default model("Homework", homeworkSchema);

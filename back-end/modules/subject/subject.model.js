import { Schema, model } from "mongoose";

const subjectSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default model("Subject", subjectSchema);

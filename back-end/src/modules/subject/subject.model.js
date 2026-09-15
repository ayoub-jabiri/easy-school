import mongoose, { Schema, model } from "mongoose";

const subjectSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    classes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default model("Subject", subjectSchema);

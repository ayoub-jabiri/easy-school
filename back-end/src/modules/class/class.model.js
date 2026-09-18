import mongoose, { Schema, model } from "mongoose";

const classSchema = new Schema({
    level: {
        type: String,
        required: true,
        enum: ["primary", "middle", "high"],
    },
    levelYear: {
        type: Number,
        required: true,
        validate: {
            validator(value) {
                if (this.level == "primary") {
                    return [1, 2, 3, 4, 5, 6].includes(value);
                }

                if (this.level == "middle" || this.level == "high") {
                    return [1, 2, 3].includes(value);
                }
            },
        },
        message: "Invalid year of the selected school level",
    },
    group: {
        type: Number,
        required: true,
        min: 1,
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    schoolRoomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SchoolRoom",
        required: true,
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default model("Class", classSchema);

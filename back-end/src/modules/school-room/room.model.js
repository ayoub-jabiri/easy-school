import mongoose, { Schema, model } from "mongoose";

const schoolRoomSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    roomNumber: {
        type: Number,
        required: true,
        unique: true,
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

export default model("SchoolRoom", schoolRoomSchema);

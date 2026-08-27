import mongoose, { Schema, model } from "mongoose";

const schoolRoomSchema = new Schema({
    roomNumber: {
        type: Number,
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

export default model("SchoolRoom", schoolRoomSchema);

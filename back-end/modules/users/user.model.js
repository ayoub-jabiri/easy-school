import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: ["admin", "teacher", "student", "parent"],
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                const { _id, __v, ...rest } = ret;

                return {
                    id: _id.toHexString(),
                    ...rest,
                };
            },
        },
    }
);

export default model("User", userSchema);

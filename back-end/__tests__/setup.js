import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import User from "../modules/users/user.model.js";
import { hashPassword, signToken } from "../utils/user.utils.js";

let mongoServer;
export const adminTestingToken = signToken({
    _id: "64b8f1e2c9e77f0012345674",
    fullName: "John Doe",
    role: "admin",
});
export const teacherTestingToken = signToken({
    _id: "64b8f1e2c9e77f0012345678",
    email: "janesmith@gmail.com",
    role: "teacher",
});

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
});

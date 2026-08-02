import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import User from "../modules/users/user.model.js";
import { hashPassword, signToken } from "../utils/user.utils.js";

let mongoServer;
export let testingUser;
export let testingToken;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());

    const hashedPassword = await hashPassword("12345678");

    testingUser = await User.create({
        fullName: "John Doe",
        phoneNumber: "0612345678",
        email: "johndoe@gmail.com",
        role: "admin",
        password: hashedPassword,
    });

    testingToken = signToken(testingUser);
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
});

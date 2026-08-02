import request from "supertest";
import app from "../../app.js";
import { testingToken } from "../setup.js";
import User from "../../modules/users/user.model.js";

describe("user register", () => {
    describe("success test cases", () => {
        test("user registered successfully", async () => {
            const res = await request(app)
                .post("/api/users/auth/register")
                .send({
                    fullName: "John Doe 1",
                    phoneNumber: "0612345678",
                    email: "johndoe1@gmail.com",
                    role: "teacher",
                    password: "12345678",
                    passwordConfirm: "12345678",
                })
                .set("Authorization", `Bearer ${testingToken}`);

            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty("message");
            expect(res.body).toHaveProperty("accessToken");
            expect(res.body).toHaveProperty("user");
        });

        test("user added successfully to the database", async () => {
            const user = await User.findOne({ email: "johndoe1@gmail.com" });
            expect(user).not.toBeNull();
            expect(user).toHaveProperty("fullName", "John Doe 1");
        });
    });
});

import request from "supertest";
import app from "../../app.js";
import { testingToken } from "../setup.js";

describe("user register", () => {
    describe("success test cases", () => {
        test("user registered with valid data", async () => {
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
        });
    });
});

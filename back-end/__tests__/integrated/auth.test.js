import request from "supertest";
import app from "../../app.js";
import { adminTestingToken, teacherTestingToken } from "../setup.js";
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
                .set("Authorization", `Bearer ${adminTestingToken}`);

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

    describe("failure test cases", () => {
        test("user registration fails due to missing admin token", async () => {
            const res = await request(app).post("/api/users/auth/register");

            expect(res.statusCode).toEqual(401);
            expect(res.body).toHaveProperty("message");
        });

        test("user registration fails due to not being an admin", async () => {
            const res = await request(app)
                .post("/api/users/auth/register")
                .set("Authorization", `Bearer ${teacherTestingToken}`);

            expect(res.statusCode).toEqual(403);
            expect(res.body).toHaveProperty("message");
        });

        test("user registration fails due to missing required body", async () => {
            const res = await request(app)
                .post("/api/users/auth/register")
                .set("Authorization", `Bearer ${adminTestingToken}`);

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty("message");
        });

        test("user registration fails due to missing required data", async () => {
            const res = await request(app)
                .post("/api/users/auth/register")
                .send({
                    fullName: "",
                    phoneNumber: "",
                    email: "",
                    role: "",
                    password: "",
                    passwordConfirm: "",
                })
                .set("Authorization", `Bearer ${adminTestingToken}`);

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty("message");
        });

        test("user registration fails due to already existing email", async () => {
            const res = await request(app)
                .post("/api/users/auth/register")
                .send({
                    fullName: "John Doe 2",
                    phoneNumber: "0612345678",
                    email: "johndoe1@gmail.com",
                    role: "teacher",
                    password: "12345678",
                    passwordConfirm: "12345678",
                })
                .set("Authorization", `Bearer ${adminTestingToken}`);

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty("message");
        });
    });
});

import request from "supertest";
import app from "../../app.js";
import { adminTestingToken, teacherTestingToken } from "../setup.js";
import Subject from "../../modules/subject/subject.model.js";

let subjectId;

describe("subject register", () => {
    describe("success test cases", () => {
        test("subject registered successfully", async () => {
            const res = await request(app)
                .post("/api/subjects")
                .send({
                    title: "Mathematics",
                })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty("message");
            expect(res.body).toHaveProperty("subject");

            subjectId = res.body.subject._id;
        });
    });

    describe("failure test cases", () => {
        test("missing admin token", async () => {
            const res = await request(app).post("/api/subjects").send({
                title: "Mathematics",
            });
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty("message");
        });

        test("invalid admin token", async () => {
            const res = await request(app)
                .post("/api/subjects")
                .send({
                    title: "Mathematics",
                })
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });

        test("missing request body", async () => {
            const res = await request(app)
                .post("/api/subjects")
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("missing title in request body", async () => {
            const res = await request(app)
                .post("/api/subjects")
                .send({})
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("duplicate subject title", async () => {
            await Subject.create({ title: "mathematics" });
            const res = await request(app)
                .post("/api/subjects")
                .send({
                    title: "Mathematics",
                })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(409);
            expect(res.body).toHaveProperty("message");
        });
    });
});

describe("get all subjects", () => {
    describe("success test cases", () => {
        test("get all subjects successfully", async () => {
            const res = await request(app)
                .get("/api/subjects")
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("subjects");
        });
    });
});

describe("get single subject", () => {
    describe("success test cases", () => {
        test("get single subject successfully", async () => {
            const res = await request(app)
                .get(`/api/subjects/${subjectId}`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("subject");
        });
    });

    describe("failure test cases", () => {
        test("invalid subject ID", async () => {
            const res = await request(app)
                .get(`/api/subjects/1111`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("subject not found", async () => {
            const res = await request(app)
                .get(`/api/subjects/111111111111111111111111`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });
    });
});

describe("update subject", () => {
    describe("success test cases", () => {
        test("update subject successfully", async () => {
            const res = await request(app)
                .put(`/api/subjects/${subjectId}`)
                .send({ title: "Physics" })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("subject");
        });
    });

    describe("failure test cases", () => {
        test("invalid subject ID", async () => {
            const res = await request(app)
                .put(`/api/subjects/1111`)
                .send({ title: "Physics" })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("subject not found", async () => {
            const res = await request(app)
                .put(`/api/subjects/111111111111111111111111`)
                .send({ title: "Physics" })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });

        test("missing request body", async () => {
            const res = await request(app)
                .put(`/api/subjects/${subjectId}`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("missing title in request body", async () => {
            const res = await request(app)
                .put(`/api/subjects/${subjectId}`)
                .send({})
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });
    });
});

describe("delete subject", () => {
    describe("failure test cases", () => {
        test("invalid subject ID", async () => {
            const res = await request(app)
                .delete(`/api/subjects/1111`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("subject not found", async () => {
            const res = await request(app)
                .delete(`/api/subjects/111111111111111111111111`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });
    });
    describe("success test cases", () => {
        test("delete subject successfully", async () => {
            const res = await request(app)
                .delete(`/api/subjects/${subjectId}`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("message");
        });
    });
});

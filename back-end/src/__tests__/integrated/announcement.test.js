import request from "supertest";
import app from "../../app.js";
import { adminTestingToken, teacherTestingToken } from "../setup.js";

let announcementId;

describe("announcement register", () => {
    describe("success test cases", () => {
        test("announcement registered successfully", async () => {
            const res = await request(app)
                .post("/api/announcements")
                .send({
                    title: "School closed tomorrow",
                    description:
                        "The school will be closed tomorrow due to maintenance work.",
                })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty("message");
            expect(res.body).toHaveProperty("announcement");

            announcementId = res.body.announcement._id;
        });
    });

    describe("failure test cases", () => {
        test("missing admin token", async () => {
            const res = await request(app).post("/api/announcements").send({
                title: "School closed tomorrow",
                description:
                    "The school will be closed tomorrow due to maintenance work.",
            });
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty("message");
        });

        test("invalid admin token", async () => {
            const res = await request(app)
                .post("/api/announcements")
                .send({
                    title: "School closed tomorrow",
                    description:
                        "The school will be closed tomorrow due to maintenance work.",
                })
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });

        test("missing request body", async () => {
            const res = await request(app)
                .post("/api/announcements")
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("missing title in request body", async () => {
            const res = await request(app)
                .post("/api/announcements")
                .send({
                    description:
                        "The school will be closed tomorrow due to maintenance work.",
                })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("missing description in request body", async () => {
            const res = await request(app)
                .post("/api/announcements")
                .send({
                    title: "School closed tomorrow",
                })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("title shorter than 3 characters", async () => {
            const res = await request(app)
                .post("/api/announcements")
                .send({
                    title: "Hi",
                    description:
                        "The school will be closed tomorrow due to maintenance work.",
                })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });
    });
});

describe("get all announcements", () => {
    describe("success test cases", () => {
        test("get all announcements successfully as admin", async () => {
            const res = await request(app)
                .get("/api/announcements")
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("announcements");
        });

        test("get all announcements successfully as teacher", async () => {
            const res = await request(app)
                .get("/api/announcements")
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("announcements");
        });
    });

    describe("failure test cases", () => {
        test("missing token", async () => {
            const res = await request(app).get("/api/announcements");
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty("message");
        });
    });
});

describe("get single announcement", () => {
    describe("success test cases", () => {
        test("get single announcement successfully as admin", async () => {
            const res = await request(app)
                .get(`/api/announcements/${announcementId}`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("announcement");
        });

        test("get single announcement successfully as teacher", async () => {
            const res = await request(app)
                .get(`/api/announcements/${announcementId}`)
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("announcement");
        });
    });

    describe("failure test cases", () => {
        test("missing token", async () => {
            const res = await request(app).get(
                `/api/announcements/${announcementId}`
            );
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty("message");
        });

        test("invalid announcement ID", async () => {
            const res = await request(app)
                .get(`/api/announcements/1111`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("announcement not found", async () => {
            const res = await request(app)
                .get(`/api/announcements/111111111111111111111111`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });
    });
});

describe("update announcement", () => {
    describe("success test cases", () => {
        test("update announcement successfully", async () => {
            const res = await request(app)
                .put(`/api/announcements/${announcementId}`)
                .send({
                    title: "School reopens Monday",
                    description:
                        "The school will reopen Monday morning as usual.",
                })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("announcement");
        });
    });

    describe("failure test cases", () => {
        test("missing admin token", async () => {
            const res = await request(app)
                .put(`/api/announcements/${announcementId}`)
                .send({
                    title: "School reopens Monday",
                    description:
                        "The school will reopen Monday morning as usual.",
                });
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty("message");
        });

        test("invalid admin token", async () => {
            const res = await request(app)
                .put(`/api/announcements/${announcementId}`)
                .send({
                    title: "School reopens Monday",
                    description:
                        "The school will reopen Monday morning as usual.",
                })
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });

        test("invalid announcement ID", async () => {
            const res = await request(app)
                .put(`/api/announcements/1111`)
                .send({
                    title: "School reopens Monday",
                    description:
                        "The school will reopen Monday morning as usual.",
                })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("announcement not found", async () => {
            const res = await request(app)
                .put(`/api/announcements/111111111111111111111111`)
                .send({
                    title: "School reopens Monday",
                    description:
                        "The school will reopen Monday morning as usual.",
                })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });

        test("missing request body", async () => {
            const res = await request(app)
                .put(`/api/announcements/${announcementId}`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("missing title in request body", async () => {
            const res = await request(app)
                .put(`/api/announcements/${announcementId}`)
                .send({
                    description:
                        "The school will reopen Monday morning as usual.",
                })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("missing description in request body", async () => {
            const res = await request(app)
                .put(`/api/announcements/${announcementId}`)
                .send({
                    title: "School reopens Monday",
                })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });
    });
});

describe("delete announcement", () => {
    describe("failure test cases", () => {
        test("missing admin token", async () => {
            const res = await request(app).delete(
                `/api/announcements/${announcementId}`
            );
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty("message");
        });

        test("invalid admin token", async () => {
            const res = await request(app)
                .delete(`/api/announcements/${announcementId}`)
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });

        test("invalid announcement ID", async () => {
            const res = await request(app)
                .delete(`/api/announcements/1111`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("announcement not found", async () => {
            const res = await request(app)
                .delete(`/api/announcements/111111111111111111111111`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });
    });

    describe("success test cases", () => {
        test("delete announcement successfully", async () => {
            const res = await request(app)
                .delete(`/api/announcements/${announcementId}`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("message");
        });
    });
});

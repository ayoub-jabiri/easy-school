import request from "supertest";
import app from "../../app.js";
import { adminTestingToken, teacherTestingToken } from "../setup.js";
import Room from "../../modules/school-room/room.model.js";

let roomId;

describe("room register", () => {
    describe("success test cases", () => {
        test("room registered successfully", async () => {
            const res = await request(app)
                .post("/api/school-rooms")
                .send({
                    roomNumber: 101,
                })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty("message");
            expect(res.body).toHaveProperty("schoolRoom");

            roomId = res.body.schoolRoom._id;
        });
    });

    describe("failure test cases", () => {
        test("missing admin token", async () => {
            const res = await request(app).post("/api/school-rooms").send({
                roomNumber: 101,
            });
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty("message");
        });

        test("invalid admin token", async () => {
            const res = await request(app)
                .post("/api/school-rooms")
                .send({
                    roomNumber: 101,
                })
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });

        test("missing request body", async () => {
            const res = await request(app)
                .post("/api/school-rooms")
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("missing roomNumber in request body", async () => {
            const res = await request(app)
                .post("/api/school-rooms")
                .send({})
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("duplicate roomNumber", async () => {
            const res = await request(app)
                .post("/api/school-rooms")
                .send({
                    roomNumber: 101,
                })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(409);
            expect(res.body).toHaveProperty("message");
        });
    });
});

describe("get all rooms", () => {
    describe("success test cases", () => {
        test("get all rooms successfully", async () => {
            const res = await request(app)
                .get("/api/school-rooms")
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("schoolRooms");
        });
    });
});

describe("get single room", () => {
    describe("success test cases", () => {
        test("get single room successfully", async () => {
            const res = await request(app)
                .get(`/api/school-rooms/${roomId}`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("schoolRoom");
        });
    });

    describe("failure test cases", () => {
        test("invalid room ID", async () => {
            const res = await request(app)
                .get(`/api/school-rooms/1111`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("room not found", async () => {
            const res = await request(app)
                .get(`/api/school-rooms/111111111111111111111111`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });
    });
});

describe("update room", () => {
    describe("success test cases", () => {
        test("update room successfully", async () => {
            const res = await request(app)
                .put(`/api/school-rooms/${roomId}`)
                .send({ roomNumber: 102 })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("schoolRoom");
        });
    });

    describe("failure test cases", () => {
        test("invalid room ID", async () => {
            const res = await request(app)
                .put(`/api/school-rooms/1111`)
                .send({ roomNumber: 102 })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("room not found", async () => {
            const res = await request(app)
                .put(`/api/school-rooms/111111111111111111111111`)
                .send({ roomNumber: 102 })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });

        test("missing request body", async () => {
            const res = await request(app)
                .put(`/api/school-rooms/${roomId}`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("missing roomNumber in request body", async () => {
            const res = await request(app)
                .put(`/api/school-rooms/${roomId}`)
                .send({})
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });
    });
});

describe("delete room", () => {
    describe("failure test cases", () => {
        test("invalid room ID", async () => {
            const res = await request(app)
                .delete(`/api/school-rooms/1111`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("room not found", async () => {
            const res = await request(app)
                .delete(`/api/school-rooms/111111111111111111111111`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });
    });
    describe("success test cases", () => {
        test("delete room successfully", async () => {
            const res = await request(app)
                .delete(`/api/school-rooms/${roomId}`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("message");
        });
    });
});

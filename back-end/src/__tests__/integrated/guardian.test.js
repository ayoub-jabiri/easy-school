import request from "supertest";
import app from "../../app.js";
import { adminTestingToken, teacherTestingToken } from "../setup.js";
import User from "../../modules/users/user.model.js";

let guardianId;

let studentId;
let parentId;
let secondStudentId;
let secondParentId;
let teacherId;

beforeAll(async () => {
    const student = await User.create({
        fullName: "Student One",
        phoneNumber: "0600000001",
        email: "studentone@gmail.com",
        password: "password123",
        role: "student",
    });
    studentId = student._id;

    const parent = await User.create({
        fullName: "Parent One",
        phoneNumber: "0600000002",
        email: "parentone@gmail.com",
        password: "password123",
        role: "parent",
    });
    parentId = parent._id;

    const secondStudent = await User.create({
        fullName: "Student Two",
        phoneNumber: "0600000003",
        email: "studenttwo@gmail.com",
        password: "password123",
        role: "student",
    });
    secondStudentId = secondStudent._id;

    const secondParent = await User.create({
        fullName: "Parent Two",
        phoneNumber: "0600000004",
        email: "parenttwo@gmail.com",
        password: "password123",
        role: "parent",
    });
    secondParentId = secondParent._id;

    const teacher = await User.create({
        fullName: "Teacher One",
        phoneNumber: "0600000005",
        email: "teacherone@gmail.com",
        password: "password123",
        role: "teacher",
    });
    teacherId = teacher._id;
});

describe("guardian register", () => {
    describe("success test cases", () => {
        test("guardian registered successfully", async () => {
            const res = await request(app)
                .post("/api/guardians")
                .send({ studentId, parentId })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty("message");
            expect(res.body).toHaveProperty("guardian");

            guardianId = res.body.guardian._id;
        });
    });

    describe("failure test cases", () => {
        test("missing admin token", async () => {
            const res = await request(app)
                .post("/api/guardians")
                .send({ studentId, parentId });
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty("message");
        });

        test("invalid admin token", async () => {
            const res = await request(app)
                .post("/api/guardians")
                .send({ studentId, parentId })
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });

        test("missing request body", async () => {
            const res = await request(app)
                .post("/api/guardians")
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("missing studentId in request body", async () => {
            const res = await request(app)
                .post("/api/guardians")
                .send({ parentId })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("missing parentId in request body", async () => {
            const res = await request(app)
                .post("/api/guardians")
                .send({ studentId })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("invalid studentId format", async () => {
            const res = await request(app)
                .post("/api/guardians")
                .send({ studentId: "1234", parentId })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("invalid parentId format", async () => {
            const res = await request(app)
                .post("/api/guardians")
                .send({ studentId, parentId: "1234" })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("duplicate guardian", async () => {
            const res = await request(app)
                .post("/api/guardians")
                .send({ studentId, parentId })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(409);
            expect(res.body).toHaveProperty("message");
        });

        test("student not found", async () => {
            const res = await request(app)
                .post("/api/guardians")
                .send({
                    studentId: "111111111111111111111111",
                    parentId: secondParentId,
                })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });

        test("registered user is not a student", async () => {
            const res = await request(app)
                .post("/api/guardians")
                .send({ studentId: teacherId, parentId: secondParentId })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("parent not found", async () => {
            const res = await request(app)
                .post("/api/guardians")
                .send({
                    studentId: secondStudentId,
                    parentId: "111111111111111111111111",
                })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });

        test("registered user is not a parent", async () => {
            const res = await request(app)
                .post("/api/guardians")
                .send({ studentId: secondStudentId, parentId: teacherId })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });
    });
});

describe("get all guardians", () => {
    describe("success test cases", () => {
        test("get all guardians successfully", async () => {
            const res = await request(app)
                .get("/api/guardians")
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("guardians");
        });
    });
});

describe("get single guardian", () => {
    describe("success test cases", () => {
        test("get single guardian successfully", async () => {
            const res = await request(app)
                .get(`/api/guardians/${guardianId}`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("guardian");
        });
    });

    describe("failure test cases", () => {
        test("invalid guardian ID", async () => {
            const res = await request(app)
                .get(`/api/guardians/1111`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("guardian not found", async () => {
            const res = await request(app)
                .get(`/api/guardians/111111111111111111111111`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });
    });
});

describe("update guardian", () => {
    describe("success test cases", () => {
        test("update guardian successfully", async () => {
            const res = await request(app)
                .put(`/api/guardians/${guardianId}`)
                .send({ studentId: secondStudentId, parentId: secondParentId })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("guardian");
        });
    });

    describe("failure test cases", () => {
        test("missing admin token", async () => {
            const res = await request(app)
                .put(`/api/guardians/${guardianId}`)
                .send({ studentId, parentId });
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty("message");
        });

        test("invalid admin token", async () => {
            const res = await request(app)
                .put(`/api/guardians/${guardianId}`)
                .send({ studentId, parentId })
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });

        test("invalid guardian ID", async () => {
            const res = await request(app)
                .put(`/api/guardians/1111`)
                .send({ studentId, parentId })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("guardian not found", async () => {
            const res = await request(app)
                .put(`/api/guardians/111111111111111111111111`)
                .send({ studentId, parentId })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });

        test("missing request body", async () => {
            const res = await request(app)
                .put(`/api/guardians/${guardianId}`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("missing studentId in request body", async () => {
            const res = await request(app)
                .put(`/api/guardians/${guardianId}`)
                .send({ parentId })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("student not found", async () => {
            const res = await request(app)
                .put(`/api/guardians/${guardianId}`)
                .send({
                    studentId: "111111111111111111111111",
                    parentId,
                })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });

        test("registered user is not a student", async () => {
            const res = await request(app)
                .put(`/api/guardians/${guardianId}`)
                .send({ studentId: teacherId, parentId })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("parent not found", async () => {
            const res = await request(app)
                .put(`/api/guardians/${guardianId}`)
                .send({
                    studentId,
                    parentId: "111111111111111111111111",
                })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });

        test("registered user is not a parent", async () => {
            const res = await request(app)
                .put(`/api/guardians/${guardianId}`)
                .send({ studentId, parentId: teacherId })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });
    });
});

describe("get guardian student", () => {
    describe("success test cases", () => {
        test("get guardian student successfully", async () => {
            const res = await request(app)
                .get(`/api/guardians/${guardianId}/student`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("student");
            expect(res.body.student).not.toHaveProperty("password");
        });
    });

    describe("failure test cases", () => {
        test("invalid guardian ID", async () => {
            const res = await request(app)
                .get(`/api/guardians/1111/student`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("guardian not found", async () => {
            const res = await request(app)
                .get(`/api/guardians/111111111111111111111111/student`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });
    });
});

describe("get guardian parent", () => {
    describe("success test cases", () => {
        test("get guardian parent successfully", async () => {
            const res = await request(app)
                .get(`/api/guardians/${guardianId}/parent`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("parent");
            expect(res.body.parent).not.toHaveProperty("password");
        });
    });

    describe("failure test cases", () => {
        test("invalid guardian ID", async () => {
            const res = await request(app)
                .get(`/api/guardians/1111/parent`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("guardian not found", async () => {
            const res = await request(app)
                .get(`/api/guardians/111111111111111111111111/parent`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });
    });
});

describe("delete guardian", () => {
    describe("failure test cases", () => {
        test("invalid guardian ID", async () => {
            const res = await request(app)
                .delete(`/api/guardians/1111`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("guardian not found", async () => {
            const res = await request(app)
                .delete(`/api/guardians/111111111111111111111111`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });
    });

    describe("success test cases", () => {
        test("delete guardian successfully", async () => {
            const res = await request(app)
                .delete(`/api/guardians/${guardianId}`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("message");
        });
    });
});

import request from "supertest";
import app from "../../app.js";
import { adminTestingToken, teacherTestingToken } from "../setup.js";
import SchoolRoom from "../../modules/school-room/room.model.js";
import User from "../../modules/users/user.model.js";

let classId;
let schoolRoomId;
let secondSchoolRoomId;
let teacherId;
let secondTeacherId;
let studentId;
let nonTeacherUserId;
let nonStudentUserId;

beforeAll(async () => {
    const schoolRoom = await SchoolRoom.create({ roomNumber: 201 });
    schoolRoomId = schoolRoom._id;

    const secondSchoolRoom = await SchoolRoom.create({ roomNumber: 202 });
    secondSchoolRoomId = secondSchoolRoom._id;

    const teacher = await User.create({
        fullName: "Teacher One",
        phoneNumber: "0600000001",
        email: "teacherone@gmail.com",
        password: "password123",
        role: "teacher",
    });
    teacherId = teacher._id;

    const secondTeacher = await User.create({
        fullName: "Teacher Two",
        phoneNumber: "0600000002",
        email: "teachertwo@gmail.com",
        password: "password123",
        role: "teacher",
    });
    secondTeacherId = secondTeacher._id;

    const student = await User.create({
        fullName: "Student One",
        phoneNumber: "0600000003",
        email: "studentone@gmail.com",
        password: "password123",
        role: "student",
    });
    studentId = student._id;

    const nonTeacherUser = await User.create({
        fullName: "Admin User",
        phoneNumber: "0600000004",
        email: "adminuser@gmail.com",
        password: "password123",
        role: "admin",
    });
    nonTeacherUserId = nonTeacherUser._id;

    const nonStudentUser = await User.create({
        fullName: "Parent User",
        phoneNumber: "0600000005",
        email: "parentuser@gmail.com",
        password: "password123",
        role: "parent",
    });
    nonStudentUserId = nonStudentUser._id;
});

describe("class register", () => {
    describe("success test cases", () => {
        test("class registered successfully", async () => {
            const res = await request(app)
                .post("/api/classes")
                .send({
                    subjectTitle: "Mathematics",
                    level: "primary",
                    levelYear: 3,
                    schoolRoomId,
                })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty("message");
            expect(res.body).toHaveProperty("class");

            classId = res.body.class._id;
        });
    });

    describe("failure test cases", () => {
        test("missing admin token", async () => {
            const res = await request(app).post("/api/classes").send({
                subjectTitle: "Mathematics",
                level: "primary",
                levelYear: 3,
                schoolRoomId,
            });
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty("message");
        });

        test("invalid admin token", async () => {
            const res = await request(app)
                .post("/api/classes")
                .send({
                    subjectTitle: "Mathematics",
                    level: "primary",
                    levelYear: 3,
                    schoolRoomId,
                })
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });

        test("missing request body", async () => {
            const res = await request(app)
                .post("/api/classes")
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("missing subjectTitle in request body", async () => {
            const res = await request(app)
                .post("/api/classes")
                .send({
                    level: "primary",
                    levelYear: 3,
                    schoolRoomId,
                })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("invalid levelYear for the selected level", async () => {
            const res = await request(app)
                .post("/api/classes")
                .send({
                    subjectTitle: "Mathematics",
                    level: "primary",
                    levelYear: 9,
                    schoolRoomId,
                })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("duplicate class", async () => {
            const res = await request(app)
                .post("/api/classes")
                .send({
                    subjectTitle: "mathematics",
                    level: "primary",
                    levelYear: 3,
                    schoolRoomId,
                })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(409);
            expect(res.body).toHaveProperty("message");
        });

        test("school room not found", async () => {
            const res = await request(app)
                .post("/api/classes")
                .send({
                    subjectTitle: "Physics",
                    level: "primary",
                    levelYear: 3,
                    schoolRoomId: "111111111111111111111111",
                })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });
    });
});

describe("get all classes", () => {
    describe("success test cases", () => {
        test("get all classes successfully", async () => {
            const res = await request(app)
                .get("/api/classes")
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("classes");
        });
    });
});

describe("get single class", () => {
    describe("success test cases", () => {
        test("get single class successfully", async () => {
            const res = await request(app)
                .get(`/api/classes/${classId}`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("class");
        });
    });

    describe("failure test cases", () => {
        test("invalid class ID", async () => {
            const res = await request(app)
                .get(`/api/classes/1111`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("class not found", async () => {
            const res = await request(app)
                .get(`/api/classes/111111111111111111111111`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });
    });
});

describe("update class", () => {
    describe("success test cases", () => {
        test("update class successfully", async () => {
            const res = await request(app)
                .put(`/api/classes/${classId}`)
                .send({
                    subjectTitle: "Mathematics",
                    level: "primary",
                    levelYear: 4,
                    schoolRoomId,
                })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("class");
        });
    });

    describe("failure test cases", () => {
        test("invalid class ID", async () => {
            const res = await request(app)
                .put(`/api/classes/1111`)
                .send({
                    subjectTitle: "Mathematics",
                    level: "primary",
                    levelYear: 4,
                    schoolRoomId,
                })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("class not found", async () => {
            const res = await request(app)
                .put(`/api/classes/111111111111111111111111`)
                .send({
                    subjectTitle: "Mathematics",
                    level: "primary",
                    levelYear: 4,
                    schoolRoomId,
                })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });

        test("missing request body", async () => {
            const res = await request(app)
                .put(`/api/classes/${classId}`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("missing subjectTitle in request body", async () => {
            const res = await request(app)
                .put(`/api/classes/${classId}`)
                .send({
                    level: "primary",
                    levelYear: 4,
                    schoolRoomId,
                })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("school room not found", async () => {
            const res = await request(app)
                .put(`/api/classes/${classId}`)
                .send({
                    subjectTitle: "Mathematics",
                    level: "primary",
                    levelYear: 4,
                    schoolRoomId: "111111111111111111111111",
                })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });
    });
});

describe("assign teacher to class", () => {
    describe("failure test cases", () => {
        test("missing admin token", async () => {
            const res = await request(app)
                .patch(`/api/classes/${classId}/assign-teacher`)
                .send({ teacherId });
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty("message");
        });

        test("invalid class ID", async () => {
            const res = await request(app)
                .patch(`/api/classes/1111/assign-teacher`)
                .send({ teacherId })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("class not found", async () => {
            const res = await request(app)
                .patch(`/api/classes/111111111111111111111111/assign-teacher`)
                .send({ teacherId })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });

        test("missing request body", async () => {
            const res = await request(app)
                .patch(`/api/classes/${classId}/assign-teacher`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("missing teacherId in request body", async () => {
            const res = await request(app)
                .patch(`/api/classes/${classId}/assign-teacher`)
                .send({})
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("teacher not found", async () => {
            const res = await request(app)
                .patch(`/api/classes/${classId}/assign-teacher`)
                .send({ teacherId: "111111111111111111111111" })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });

        test("assigned user is not a teacher", async () => {
            const res = await request(app)
                .patch(`/api/classes/${classId}/assign-teacher`)
                .send({ teacherId: nonTeacherUserId })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });
    });

    describe("success test cases", () => {
        test("teacher assigned to class successfully", async () => {
            const res = await request(app)
                .patch(`/api/classes/${classId}/assign-teacher`)
                .send({ teacherId })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("message");
            expect(res.body).toHaveProperty("class");
        });
    });

    describe("failure test cases after assignment", () => {
        test("class already has a teacher assigned", async () => {
            const res = await request(app)
                .patch(`/api/classes/${classId}/assign-teacher`)
                .send({ teacherId: secondTeacherId })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });
    });
});

describe("get class teacher", () => {
    describe("success test cases", () => {
        test("get class teacher successfully", async () => {
            const res = await request(app)
                .get(`/api/classes/${classId}/teacher`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("teacher");
        });
    });

    describe("failure test cases", () => {
        test("invalid class ID", async () => {
            const res = await request(app)
                .get(`/api/classes/1111/teacher`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("class not found", async () => {
            const res = await request(app)
                .get(`/api/classes/111111111111111111111111/teacher`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });
    });
});

describe("get class school room", () => {
    describe("success test cases", () => {
        test("get class school room successfully", async () => {
            const res = await request(app)
                .get(`/api/classes/${classId}/school-room`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("schoolRoom");
        });
    });

    describe("failure test cases", () => {
        test("invalid class ID", async () => {
            const res = await request(app)
                .get(`/api/classes/1111/school-room`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("class not found", async () => {
            const res = await request(app)
                .get(`/api/classes/111111111111111111111111/school-room`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });
    });
});

describe("unassign teacher from class", () => {
    describe("failure test cases", () => {
        test("missing admin token", async () => {
            const res = await request(app).patch(
                `/api/classes/${classId}/unassign-teacher`
            );
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty("message");
        });

        test("invalid class ID", async () => {
            const res = await request(app)
                .patch(`/api/classes/1111/unassign-teacher`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("class not found", async () => {
            const res = await request(app)
                .patch(`/api/classes/111111111111111111111111/unassign-teacher`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });
    });

    describe("success test cases", () => {
        test("teacher unassigned from class successfully", async () => {
            const res = await request(app)
                .patch(`/api/classes/${classId}/unassign-teacher`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("message");
            expect(res.body).toHaveProperty("class");
        });
    });

    describe("failure test cases after unassignment", () => {
        test("class does not have a teacher assigned", async () => {
            const res = await request(app)
                .patch(`/api/classes/${classId}/unassign-teacher`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });
    });
});

describe("register student to class", () => {
    describe("failure test cases", () => {
        test("missing admin token", async () => {
            const res = await request(app)
                .patch(`/api/classes/${classId}/register-student`)
                .send({ studentId });
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty("message");
        });

        test("invalid class ID", async () => {
            const res = await request(app)
                .patch(`/api/classes/1111/register-student`)
                .send({ studentId })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("class not found", async () => {
            const res = await request(app)
                .patch(`/api/classes/111111111111111111111111/register-student`)
                .send({ studentId })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });

        test("missing request body", async () => {
            const res = await request(app)
                .patch(`/api/classes/${classId}/register-student`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("missing studentId in request body", async () => {
            const res = await request(app)
                .patch(`/api/classes/${classId}/register-student`)
                .send({})
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("student not found", async () => {
            const res = await request(app)
                .patch(`/api/classes/${classId}/register-student`)
                .send({ studentId: "111111111111111111111111" })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });

        test("registered user is not a student", async () => {
            const res = await request(app)
                .patch(`/api/classes/${classId}/register-student`)
                .send({ studentId: nonStudentUserId })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });
    });

    describe("success test cases", () => {
        test("student registered to class successfully", async () => {
            const res = await request(app)
                .patch(`/api/classes/${classId}/register-student`)
                .send({ studentId })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("message");
            expect(res.body).toHaveProperty("class");
        });
    });

    describe("failure test cases after registration", () => {
        test("student is already registered in this class", async () => {
            const res = await request(app)
                .patch(`/api/classes/${classId}/register-student`)
                .send({ studentId })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });
    });
});

describe("get class students", () => {
    describe("success test cases", () => {
        test("get class students successfully", async () => {
            const res = await request(app)
                .get(`/api/classes/${classId}/students`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("students");
        });
    });

    describe("failure test cases", () => {
        test("invalid class ID", async () => {
            const res = await request(app)
                .get(`/api/classes/1111/students`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("class not found", async () => {
            const res = await request(app)
                .get(`/api/classes/111111111111111111111111/students`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });
    });
});

describe("unregister student from class", () => {
    describe("failure test cases", () => {
        test("missing admin token", async () => {
            const res = await request(app)
                .patch(`/api/classes/${classId}/unregister-student`)
                .send({ studentId });
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty("message");
        });

        test("invalid class ID", async () => {
            const res = await request(app)
                .patch(`/api/classes/1111/unregister-student`)
                .send({ studentId })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("class not found", async () => {
            const res = await request(app)
                .patch(
                    `/api/classes/111111111111111111111111/unregister-student`
                )
                .send({ studentId })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });

        test("missing request body", async () => {
            const res = await request(app)
                .patch(`/api/classes/${classId}/unregister-student`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("student not registered in this class", async () => {
            const res = await request(app)
                .patch(`/api/classes/${classId}/unregister-student`)
                .send({ studentId: secondTeacherId })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });
    });

    describe("success test cases", () => {
        test("student unregistered from class successfully", async () => {
            const res = await request(app)
                .patch(`/api/classes/${classId}/unregister-student`)
                .send({ studentId })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("message");
            expect(res.body).toHaveProperty("class");
        });
    });
});

describe("delete class", () => {
    describe("failure test cases", () => {
        test("invalid class ID", async () => {
            const res = await request(app)
                .delete(`/api/classes/1111`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("class not found", async () => {
            const res = await request(app)
                .delete(`/api/classes/111111111111111111111111`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });
    });

    describe("success test cases", () => {
        test("delete class successfully", async () => {
            const res = await request(app)
                .delete(`/api/classes/${classId}`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("message");
        });
    });
});

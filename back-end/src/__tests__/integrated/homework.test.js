import request from "supertest";
import app from "../../app.js";
import { adminTestingToken, teacherTestingToken } from "../setup.js";
import { signToken } from "../../utils/user.utils.js";
import SchoolRoom from "../../modules/school-room/room.model.js";
import ClassModel from "../../modules/class/class.model.js";
import User from "../../modules/users/user.model.js";

let schoolRoomId;
let teacherId;
let secondTeacherId;
let secondTeacherToken;
let studentId;
let studentToken;
let secondStudentId;
let secondStudentToken;
let nonTeacherUserId;
let fakeTeacherToken;
let ghostTeacherToken;
let parentToken;

let mainClassId;
let secondTeacherClassId;

let homeworkId;

beforeAll(async () => {
    const schoolRoom = await SchoolRoom.create({ roomNumber: 501 });
    schoolRoomId = schoolRoom._id;

    // This _id must match the id encoded in teacherTestingToken (see setup.js)
    // since teacherId is derived from the token, not the request body.
    const teacher = await User.create({
        _id: "64b8f1e2c9e77f0012345678",
        fullName: "Jane Smith",
        phoneNumber: "0600000010",
        email: "janesmith@gmail.com",
        password: "password123",
        role: "teacher",
    });
    teacherId = teacher._id;

    const secondTeacher = await User.create({
        fullName: "Second Teacher",
        phoneNumber: "0600000011",
        email: "secondteacher@gmail.com",
        password: "password123",
        role: "teacher",
    });
    secondTeacherId = secondTeacher._id;
    secondTeacherToken = signToken({ _id: secondTeacherId, role: "teacher" });

    const student = await User.create({
        fullName: "Homework Student",
        phoneNumber: "0600000012",
        email: "homeworkstudent@gmail.com",
        password: "password123",
        role: "student",
    });
    studentId = student._id;
    studentToken = signToken({ _id: studentId, role: "student" });

    const secondStudent = await User.create({
        fullName: "Unregistered Student",
        phoneNumber: "0600000013",
        email: "unregisteredstudent2@gmail.com",
        password: "password123",
        role: "student",
    });
    secondStudentId = secondStudent._id;
    secondStudentToken = signToken({ _id: secondStudentId, role: "student" });

    // A real user whose DB role is "student", but whose token claims "teacher"
    // so it clears the router's authorizationCheck(["teacher"]) and reaches
    // teacherCheck, which is expected to reject it based on the DB role.
    const nonTeacherUser = await User.create({
        fullName: "Not A Teacher",
        phoneNumber: "0600000014",
        email: "notateacherhw@gmail.com",
        password: "password123",
        role: "student",
    });
    nonTeacherUserId = nonTeacherUser._id;
    fakeTeacherToken = signToken({ _id: nonTeacherUserId, role: "teacher" });

    // A syntactically valid id with no matching User document at all.
    ghostTeacherToken = signToken({
        _id: "111111111111111111111111",
        role: "teacher",
    });

    parentToken = signToken({
        _id: "222222222222222222222222",
        role: "parent",
    });

    const mainClass = await ClassModel.create({
        subjectTitle: "mathematics",
        level: "primary",
        levelYear: 3,
        teacherId,
        students: [studentId],
        schoolRoomId,
    });
    mainClassId = mainClass._id;

    const secondTeacherClass = await ClassModel.create({
        subjectTitle: "physics",
        level: "primary",
        levelYear: 3,
        teacherId: secondTeacherId,
        students: [],
        schoolRoomId,
    });
    secondTeacherClassId = secondTeacherClass._id;
});

describe("homework register", () => {
    describe("failure test cases", () => {
        test("missing token", async () => {
            const res = await request(app).post("/api/homeworks").send({
                title: "Algebra exercises",
                description: "Do exercises 1 to 10",
                dueDate: "2026-09-20",
                classId: mainClassId,
            });
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty("message");
        });

        test("non-teacher token", async () => {
            const res = await request(app)
                .post("/api/homeworks")
                .send({
                    title: "Algebra exercises",
                    description: "Do exercises 1 to 10",
                    dueDate: "2026-09-20",
                    classId: mainClassId,
                })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });

        test("missing request body", async () => {
            const res = await request(app)
                .post("/api/homeworks")
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("missing title in request body", async () => {
            const res = await request(app)
                .post("/api/homeworks")
                .send({
                    description: "Do exercises 1 to 10",
                    dueDate: "2026-09-20",
                    classId: mainClassId,
                })
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("title shorter than 3 characters", async () => {
            const res = await request(app)
                .post("/api/homeworks")
                .send({
                    title: "Hi",
                    description: "Do exercises 1 to 10",
                    dueDate: "2026-09-20",
                    classId: mainClassId,
                })
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("missing description in request body", async () => {
            const res = await request(app)
                .post("/api/homeworks")
                .send({
                    title: "Algebra exercises",
                    dueDate: "2026-09-20",
                    classId: mainClassId,
                })
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("missing dueDate in request body", async () => {
            const res = await request(app)
                .post("/api/homeworks")
                .send({
                    title: "Algebra exercises",
                    description: "Do exercises 1 to 10",
                    classId: mainClassId,
                })
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("invalid dueDate format", async () => {
            const res = await request(app)
                .post("/api/homeworks")
                .send({
                    title: "Algebra exercises",
                    description: "Do exercises 1 to 10",
                    dueDate: "not-a-date",
                    classId: mainClassId,
                })
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("missing classId in request body", async () => {
            const res = await request(app)
                .post("/api/homeworks")
                .send({
                    title: "Algebra exercises",
                    description: "Do exercises 1 to 10",
                    dueDate: "2026-09-20",
                })
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("invalid classId format", async () => {
            const res = await request(app)
                .post("/api/homeworks")
                .send({
                    title: "Algebra exercises",
                    description: "Do exercises 1 to 10",
                    dueDate: "2026-09-20",
                    classId: "1234",
                })
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("teacher not found", async () => {
            const res = await request(app)
                .post("/api/homeworks")
                .send({
                    title: "Algebra exercises",
                    description: "Do exercises 1 to 10",
                    dueDate: "2026-09-20",
                    classId: mainClassId,
                })
                .set("Authorization", `Bearer ${ghostTeacherToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });

        test("logged-in user is not a teacher", async () => {
            const res = await request(app)
                .post("/api/homeworks")
                .send({
                    title: "Algebra exercises",
                    description: "Do exercises 1 to 10",
                    dueDate: "2026-09-20",
                    classId: mainClassId,
                })
                .set("Authorization", `Bearer ${fakeTeacherToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("class not found", async () => {
            const res = await request(app)
                .post("/api/homeworks")
                .send({
                    title: "Algebra exercises",
                    description: "Do exercises 1 to 10",
                    dueDate: "2026-09-20",
                    classId: "111111111111111111111111",
                })
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });

        test("class does not belong to this teacher", async () => {
            const res = await request(app)
                .post("/api/homeworks")
                .send({
                    title: "Algebra exercises",
                    description: "Do exercises 1 to 10",
                    dueDate: "2026-09-20",
                    classId: secondTeacherClassId,
                })
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });
    });

    describe("success test cases", () => {
        test("homework registered successfully", async () => {
            const res = await request(app)
                .post("/api/homeworks")
                .send({
                    title: "Algebra exercises",
                    description: "Do exercises 1 to 10",
                    dueDate: "2026-09-20",
                    classId: mainClassId,
                })
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty("message");
            expect(res.body).toHaveProperty("homework");
            expect(res.body.homework.teacherId).toBe(teacherId.toString());

            homeworkId = res.body.homework._id;
        });
    });
});

describe("get all homeworks", () => {
    describe("success test cases", () => {
        test("get all homeworks successfully as admin", async () => {
            const res = await request(app)
                .get("/api/homeworks")
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("homeworks");
        });

        test("get all homeworks successfully as the owning teacher", async () => {
            const res = await request(app)
                .get("/api/homeworks")
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("homeworks");
        });

        test("get all homeworks successfully as an enrolled student", async () => {
            const res = await request(app)
                .get("/api/homeworks")
                .set("Authorization", `Bearer ${studentToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("homeworks");
        });
    });

    describe("failure test cases", () => {
        test("missing token", async () => {
            const res = await request(app).get("/api/homeworks");
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty("message");
        });

        test("forbidden role", async () => {
            const res = await request(app)
                .get("/api/homeworks")
                .set("Authorization", `Bearer ${parentToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });
    });
});

describe("get single homework", () => {
    describe("success test cases", () => {
        test("get single homework successfully as admin", async () => {
            const res = await request(app)
                .get(`/api/homeworks/${homeworkId}`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("homework");
        });

        test("get single homework successfully as the owning teacher", async () => {
            const res = await request(app)
                .get(`/api/homeworks/${homeworkId}`)
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("homework");
        });

        test("get single homework successfully as an enrolled student", async () => {
            const res = await request(app)
                .get(`/api/homeworks/${homeworkId}`)
                .set("Authorization", `Bearer ${studentToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("homework");
        });
    });

    describe("failure test cases", () => {
        test("missing token", async () => {
            const res = await request(app).get(`/api/homeworks/${homeworkId}`);
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty("message");
        });

        test("forbidden role", async () => {
            const res = await request(app)
                .get(`/api/homeworks/${homeworkId}`)
                .set("Authorization", `Bearer ${parentToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });

        test("invalid homework ID", async () => {
            const res = await request(app)
                .get(`/api/homeworks/1111`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("homework not found", async () => {
            const res = await request(app)
                .get(`/api/homeworks/111111111111111111111111`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });

        test("non-owning teacher cannot access this homework", async () => {
            const res = await request(app)
                .get(`/api/homeworks/${homeworkId}`)
                .set("Authorization", `Bearer ${secondTeacherToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });

        test("non-enrolled student cannot access this homework", async () => {
            const res = await request(app)
                .get(`/api/homeworks/${homeworkId}`)
                .set("Authorization", `Bearer ${secondStudentToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });
    });
});

describe("update homework", () => {
    describe("failure test cases", () => {
        test("missing token", async () => {
            const res = await request(app)
                .put(`/api/homeworks/${homeworkId}`)
                .send({
                    title: "Algebra exercises v2",
                    description: "Do exercises 1 to 15",
                    dueDate: "2026-09-22",
                });
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty("message");
        });

        test("non-teacher token", async () => {
            const res = await request(app)
                .put(`/api/homeworks/${homeworkId}`)
                .send({
                    title: "Algebra exercises v2",
                    description: "Do exercises 1 to 15",
                    dueDate: "2026-09-22",
                })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });

        test("invalid homework ID", async () => {
            const res = await request(app)
                .put(`/api/homeworks/1111`)
                .send({
                    title: "Algebra exercises v2",
                    description: "Do exercises 1 to 15",
                    dueDate: "2026-09-22",
                })
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("homework not found", async () => {
            const res = await request(app)
                .put(`/api/homeworks/111111111111111111111111`)
                .send({
                    title: "Algebra exercises v2",
                    description: "Do exercises 1 to 15",
                    dueDate: "2026-09-22",
                })
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });

        test("non-owning teacher cannot update this homework", async () => {
            const res = await request(app)
                .put(`/api/homeworks/${homeworkId}`)
                .send({
                    title: "Hijack",
                    description: "Do exercises 1 to 15",
                    dueDate: "2026-09-22",
                })
                .set("Authorization", `Bearer ${secondTeacherToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });

        test("missing request body", async () => {
            const res = await request(app)
                .put(`/api/homeworks/${homeworkId}`)
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("missing title in request body", async () => {
            const res = await request(app)
                .put(`/api/homeworks/${homeworkId}`)
                .send({
                    description: "Do exercises 1 to 15",
                    dueDate: "2026-09-22",
                })
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("invalid dueDate format", async () => {
            const res = await request(app)
                .put(`/api/homeworks/${homeworkId}`)
                .send({
                    title: "Algebra exercises v2",
                    description: "Do exercises 1 to 15",
                    dueDate: "not-a-date",
                })
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });
    });

    describe("success test cases", () => {
        test("update homework successfully", async () => {
            const res = await request(app)
                .put(`/api/homeworks/${homeworkId}`)
                .send({
                    title: "Algebra exercises v2",
                    description: "Do exercises 1 to 15",
                    dueDate: "2026-09-22",
                })
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("homework");
        });
    });
});

describe("get homework class", () => {
    describe("success test cases", () => {
        test("get homework class successfully as admin", async () => {
            const res = await request(app)
                .get(`/api/homeworks/${homeworkId}/class`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("class");
        });

        test("get homework class successfully as the owning teacher", async () => {
            const res = await request(app)
                .get(`/api/homeworks/${homeworkId}/class`)
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("class");
        });

        test("get homework class successfully as an enrolled student", async () => {
            const res = await request(app)
                .get(`/api/homeworks/${homeworkId}/class`)
                .set("Authorization", `Bearer ${studentToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("class");
        });
    });

    describe("failure test cases", () => {
        test("missing token", async () => {
            const res = await request(app).get(
                `/api/homeworks/${homeworkId}/class`
            );
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty("message");
        });

        test("forbidden role", async () => {
            const res = await request(app)
                .get(`/api/homeworks/${homeworkId}/class`)
                .set("Authorization", `Bearer ${parentToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });

        test("invalid homework ID", async () => {
            const res = await request(app)
                .get(`/api/homeworks/1111/class`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("homework not found", async () => {
            const res = await request(app)
                .get(`/api/homeworks/111111111111111111111111/class`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });

        test("non-owning teacher cannot access this homework's class", async () => {
            const res = await request(app)
                .get(`/api/homeworks/${homeworkId}/class`)
                .set("Authorization", `Bearer ${secondTeacherToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });

        test("non-enrolled student cannot access this homework's class", async () => {
            const res = await request(app)
                .get(`/api/homeworks/${homeworkId}/class`)
                .set("Authorization", `Bearer ${secondStudentToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });
    });
});

describe("get homework teacher", () => {
    describe("success test cases", () => {
        test("get homework teacher successfully as admin", async () => {
            const res = await request(app)
                .get(`/api/homeworks/${homeworkId}/teacher`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("teacher");
            expect(res.body.teacher).not.toHaveProperty("password");
        });

        test("get homework teacher successfully as the owning teacher", async () => {
            const res = await request(app)
                .get(`/api/homeworks/${homeworkId}/teacher`)
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("teacher");
        });

        test("get homework teacher successfully as an enrolled student", async () => {
            const res = await request(app)
                .get(`/api/homeworks/${homeworkId}/teacher`)
                .set("Authorization", `Bearer ${studentToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("teacher");
        });
    });

    describe("failure test cases", () => {
        test("missing token", async () => {
            const res = await request(app).get(
                `/api/homeworks/${homeworkId}/teacher`
            );
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty("message");
        });

        test("forbidden role", async () => {
            const res = await request(app)
                .get(`/api/homeworks/${homeworkId}/teacher`)
                .set("Authorization", `Bearer ${parentToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });

        test("invalid homework ID", async () => {
            const res = await request(app)
                .get(`/api/homeworks/1111/teacher`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("homework not found", async () => {
            const res = await request(app)
                .get(`/api/homeworks/111111111111111111111111/teacher`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });

        test("non-owning teacher cannot access this homework's teacher", async () => {
            const res = await request(app)
                .get(`/api/homeworks/${homeworkId}/teacher`)
                .set("Authorization", `Bearer ${secondTeacherToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });

        test("non-enrolled student cannot access this homework's teacher", async () => {
            const res = await request(app)
                .get(`/api/homeworks/${homeworkId}/teacher`)
                .set("Authorization", `Bearer ${secondStudentToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });
    });
});

describe("delete homework", () => {
    describe("failure test cases", () => {
        test("missing token", async () => {
            const res = await request(app).delete(
                `/api/homeworks/${homeworkId}`
            );
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty("message");
        });

        test("forbidden role", async () => {
            const res = await request(app)
                .delete(`/api/homeworks/${homeworkId}`)
                .set("Authorization", `Bearer ${studentToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });

        test("invalid homework ID", async () => {
            const res = await request(app)
                .delete(`/api/homeworks/1111`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("homework not found", async () => {
            const res = await request(app)
                .delete(`/api/homeworks/111111111111111111111111`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });

        test("non-owning teacher cannot delete this homework", async () => {
            const res = await request(app)
                .delete(`/api/homeworks/${homeworkId}`)
                .set("Authorization", `Bearer ${secondTeacherToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });
    });

    describe("success test cases", () => {
        test("delete homework successfully", async () => {
            const res = await request(app)
                .delete(`/api/homeworks/${homeworkId}`)
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("message");
        });
    });
});

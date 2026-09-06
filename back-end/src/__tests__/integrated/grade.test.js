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

let gradeId;

beforeAll(async () => {
    const schoolRoom = await SchoolRoom.create({ roomNumber: 301 });
    schoolRoomId = schoolRoom._id;

    // This _id must match the id encoded in teacherTestingToken (see setup.js)
    // since teacherId is now derived from the token, not the request body.
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
        fullName: "Grade Student",
        phoneNumber: "0600000012",
        email: "gradestudent@gmail.com",
        password: "password123",
        role: "student",
    });
    studentId = student._id;
    studentToken = signToken({ _id: studentId, role: "student" });

    const secondStudent = await User.create({
        fullName: "Unregistered Student",
        phoneNumber: "0600000013",
        email: "unregisteredstudent@gmail.com",
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
        email: "notateacher@gmail.com",
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

describe("grade register", () => {
    describe("failure test cases", () => {
        test("missing token", async () => {
            const res = await request(app).post("/api/grades").send({
                grade: 15,
                evaluation: "Good work",
                studentId,
                classId: mainClassId,
            });
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty("message");
        });

        test("non-teacher token", async () => {
            const res = await request(app)
                .post("/api/grades")
                .send({
                    grade: 15,
                    evaluation: "Good work",
                    studentId,
                    classId: mainClassId,
                })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });

        test("missing request body", async () => {
            const res = await request(app)
                .post("/api/grades")
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("missing grade in request body", async () => {
            const res = await request(app)
                .post("/api/grades")
                .send({
                    evaluation: "Good work",
                    studentId,
                    classId: mainClassId,
                })
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("missing evaluation in request body", async () => {
            const res = await request(app)
                .post("/api/grades")
                .send({
                    grade: 15,
                    studentId,
                    classId: mainClassId,
                })
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("grade above the allowed range", async () => {
            const res = await request(app)
                .post("/api/grades")
                .send({
                    grade: 21,
                    evaluation: "Good work",
                    studentId,
                    classId: mainClassId,
                })
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("missing studentId in request body", async () => {
            const res = await request(app)
                .post("/api/grades")
                .send({
                    grade: 15,
                    evaluation: "Good work",
                    classId: mainClassId,
                })
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("missing classId in request body", async () => {
            const res = await request(app)
                .post("/api/grades")
                .send({
                    grade: 15,
                    evaluation: "Good work",
                    studentId,
                })
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("invalid studentId format", async () => {
            const res = await request(app)
                .post("/api/grades")
                .send({
                    grade: 15,
                    evaluation: "Good work",
                    studentId: "1234",
                    classId: mainClassId,
                })
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("invalid classId format", async () => {
            const res = await request(app)
                .post("/api/grades")
                .send({
                    grade: 15,
                    evaluation: "Good work",
                    studentId,
                    classId: "1234",
                })
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("teacher not found", async () => {
            const res = await request(app)
                .post("/api/grades")
                .send({
                    grade: 15,
                    evaluation: "Good work",
                    studentId,
                    classId: mainClassId,
                })
                .set("Authorization", `Bearer ${ghostTeacherToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });

        test("logged-in user is not a teacher", async () => {
            const res = await request(app)
                .post("/api/grades")
                .send({
                    grade: 15,
                    evaluation: "Good work",
                    studentId,
                    classId: mainClassId,
                })
                .set("Authorization", `Bearer ${fakeTeacherToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("class not found", async () => {
            const res = await request(app)
                .post("/api/grades")
                .send({
                    grade: 15,
                    evaluation: "Good work",
                    studentId,
                    classId: "111111111111111111111111",
                })
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });

        test("class does not belong to this teacher", async () => {
            const res = await request(app)
                .post("/api/grades")
                .send({
                    grade: 15,
                    evaluation: "Good work",
                    studentId,
                    classId: secondTeacherClassId,
                })
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("student not found", async () => {
            const res = await request(app)
                .post("/api/grades")
                .send({
                    grade: 15,
                    evaluation: "Good work",
                    studentId: "111111111111111111111111",
                    classId: mainClassId,
                })
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });

        test("registered user is not a student", async () => {
            const res = await request(app)
                .post("/api/grades")
                .send({
                    grade: 15,
                    evaluation: "Good work",
                    studentId: teacherId,
                    classId: mainClassId,
                })
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("student is not registered in this class", async () => {
            const res = await request(app)
                .post("/api/grades")
                .send({
                    grade: 15,
                    evaluation: "Good work",
                    studentId: secondStudentId,
                    classId: mainClassId,
                })
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });
    });

    describe("success test cases", () => {
        test("grade registered successfully", async () => {
            const res = await request(app)
                .post("/api/grades")
                .send({
                    grade: 15,
                    evaluation: "Good work",
                    studentId,
                    classId: mainClassId,
                })
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty("message");
            expect(res.body).toHaveProperty("grade");
            expect(res.body.grade.teacherId).toBe(teacherId.toString());

            gradeId = res.body.grade._id;
        });
    });
});

describe("get all grades", () => {
    describe("success test cases", () => {
        test("get all grades successfully as admin", async () => {
            const res = await request(app)
                .get("/api/grades")
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("grades");
        });

        test("get all grades as student", async () => {
            const res = await request(app)
                .get("/api/grades")
                .set("Authorization", `Bearer ${studentToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("grades");
        });

        test("get all grades as teacher", async () => {
            const res = await request(app)
                .get("/api/grades")
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("grades");
        });
    });

    describe("failure test cases", () => {
        test("missing token", async () => {
            const res = await request(app).get("/api/grades");
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty("message");
        });

        test("forbidden role", async () => {
            const res = await request(app)
                .get("/api/grades")
                .set("Authorization", `Bearer ${parentToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });
    });
});

describe("get single grade", () => {
    describe("success test cases", () => {
        test("get single grade successfully as admin", async () => {
            const res = await request(app)
                .get(`/api/grades/${gradeId}`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("grade");
        });

        test("get single grade successfully as the owning teacher", async () => {
            const res = await request(app)
                .get(`/api/grades/${gradeId}`)
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("grade");
        });

        test("get single grade successfully as the owning student", async () => {
            const res = await request(app)
                .get(`/api/grades/${gradeId}`)
                .set("Authorization", `Bearer ${studentToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("grade");
        });
    });

    describe("failure test cases", () => {
        test("missing token", async () => {
            const res = await request(app).get(`/api/grades/${gradeId}`);
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty("message");
        });

        test("forbidden role", async () => {
            const res = await request(app)
                .get(`/api/grades/${gradeId}`)
                .set("Authorization", `Bearer ${parentToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });

        test("invalid grade ID", async () => {
            const res = await request(app)
                .get(`/api/grades/1111`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("grade not found", async () => {
            const res = await request(app)
                .get(`/api/grades/111111111111111111111111`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });

        test("non-owning teacher cannot access this grade", async () => {
            const res = await request(app)
                .get(`/api/grades/${gradeId}`)
                .set("Authorization", `Bearer ${secondTeacherToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });

        test("non-owning student cannot access this grade", async () => {
            const res = await request(app)
                .get(`/api/grades/${gradeId}`)
                .set("Authorization", `Bearer ${secondStudentToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });
    });
});

describe("update grade", () => {
    describe("failure test cases", () => {
        test("missing token", async () => {
            const res = await request(app)
                .put(`/api/grades/${gradeId}`)
                .send({ grade: 18, evaluation: "Excellent work" });
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty("message");
        });

        test("non-teacher token", async () => {
            const res = await request(app)
                .put(`/api/grades/${gradeId}`)
                .send({ grade: 18, evaluation: "Excellent work" })
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });

        test("invalid grade ID", async () => {
            const res = await request(app)
                .put(`/api/grades/1111`)
                .send({ grade: 18, evaluation: "Excellent work" })
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("grade not found", async () => {
            const res = await request(app)
                .put(`/api/grades/111111111111111111111111`)
                .send({ grade: 18, evaluation: "Excellent work" })
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });

        test("non-owning teacher cannot update this grade", async () => {
            const res = await request(app)
                .put(`/api/grades/${gradeId}`)
                .send({ grade: 18, evaluation: "Excellent work" })
                .set("Authorization", `Bearer ${secondTeacherToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });

        test("missing request body", async () => {
            const res = await request(app)
                .put(`/api/grades/${gradeId}`)
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("missing grade in request body", async () => {
            const res = await request(app)
                .put(`/api/grades/${gradeId}`)
                .send({ evaluation: "Excellent work" })
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("grade above the allowed range", async () => {
            const res = await request(app)
                .put(`/api/grades/${gradeId}`)
                .send({ grade: 25, evaluation: "Excellent work" })
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });
    });

    describe("success test cases", () => {
        test("update grade successfully", async () => {
            const res = await request(app)
                .put(`/api/grades/${gradeId}`)
                .send({ grade: 18, evaluation: "Excellent work" })
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("grade");
        });
    });
});

describe("get grade student", () => {
    describe("success test cases", () => {
        test("get grade student successfully as admin", async () => {
            const res = await request(app)
                .get(`/api/grades/${gradeId}/student`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("student");
            expect(res.body.student).not.toHaveProperty("password");
        });

        test("get grade student successfully as the owning teacher", async () => {
            const res = await request(app)
                .get(`/api/grades/${gradeId}/student`)
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("student");
        });
    });

    describe("failure test cases", () => {
        test("missing token", async () => {
            const res = await request(app).get(
                `/api/grades/${gradeId}/student`
            );
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty("message");
        });

        test("forbidden role", async () => {
            const res = await request(app)
                .get(`/api/grades/${gradeId}/student`)
                .set("Authorization", `Bearer ${studentToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });

        test("invalid grade ID", async () => {
            const res = await request(app)
                .get(`/api/grades/1111/student`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("grade not found", async () => {
            const res = await request(app)
                .get(`/api/grades/111111111111111111111111/student`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });

        test("non-owning teacher cannot access this grade's student", async () => {
            const res = await request(app)
                .get(`/api/grades/${gradeId}/student`)
                .set("Authorization", `Bearer ${secondTeacherToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });
    });
});

describe("get grade teacher", () => {
    describe("success test cases", () => {
        test("get grade teacher successfully as admin", async () => {
            const res = await request(app)
                .get(`/api/grades/${gradeId}/teacher`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("teacher");
            expect(res.body.teacher).not.toHaveProperty("password");
        });

        test("get grade teacher successfully as the owning teacher", async () => {
            const res = await request(app)
                .get(`/api/grades/${gradeId}/teacher`)
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("teacher");
        });
    });

    describe("failure test cases", () => {
        test("missing token", async () => {
            const res = await request(app).get(
                `/api/grades/${gradeId}/teacher`
            );
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty("message");
        });

        test("forbidden role", async () => {
            const res = await request(app)
                .get(`/api/grades/${gradeId}/teacher`)
                .set("Authorization", `Bearer ${studentToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });

        test("invalid grade ID", async () => {
            const res = await request(app)
                .get(`/api/grades/1111/teacher`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("grade not found", async () => {
            const res = await request(app)
                .get(`/api/grades/111111111111111111111111/teacher`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });

        test("non-owning teacher cannot access this grade's teacher", async () => {
            const res = await request(app)
                .get(`/api/grades/${gradeId}/teacher`)
                .set("Authorization", `Bearer ${secondTeacherToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });
    });
});

describe("delete grade", () => {
    describe("failure test cases", () => {
        test("missing token", async () => {
            const res = await request(app).delete(`/api/grades/${gradeId}`);
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty("message");
        });

        test("forbidden role", async () => {
            const res = await request(app)
                .delete(`/api/grades/${gradeId}`)
                .set("Authorization", `Bearer ${studentToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });

        test("invalid grade ID", async () => {
            const res = await request(app)
                .delete(`/api/grades/1111`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("grade not found", async () => {
            const res = await request(app)
                .delete(`/api/grades/111111111111111111111111`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });

        test("non-owning teacher cannot delete this grade", async () => {
            const res = await request(app)
                .delete(`/api/grades/${gradeId}`)
                .set("Authorization", `Bearer ${secondTeacherToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });
    });

    describe("success test cases", () => {
        test("delete grade successfully", async () => {
            const res = await request(app)
                .delete(`/api/grades/${gradeId}`)
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("message");
        });
    });
});

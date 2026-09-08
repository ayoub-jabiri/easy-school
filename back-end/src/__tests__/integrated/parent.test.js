import request from "supertest";
import app from "../../app.js";
import { adminTestingToken, teacherTestingToken } from "../setup.js";
import { signToken } from "../../utils/user.utils.js";
import User from "../../modules/users/user.model.js";
import SchoolRoom from "../../modules/school-room/room.model.js";
import ClassModel from "../../modules/class/class.model.js";
import Guardian from "../../modules/guardian/guardian.model.js";
import Grade from "../../modules/grade/grade.model.js";
import Homework from "../../modules/homework/homework.model.js";

let parentToken;
let parentWithNoChildrenToken;
let teacherId;
let studentId;
let classId;

beforeAll(async () => {
    const parent = await User.create({
        fullName: "Parent One",
        phoneNumber: "0600000001",
        email: "parentone@gmail.com",
        password: "password123",
        role: "parent",
    });
    parentToken = signToken({ _id: parent._id, role: "parent" });

    const parentWithNoChildren = await User.create({
        fullName: "Parent With No Children",
        phoneNumber: "0600000002",
        email: "parentwithnochildren@gmail.com",
        password: "password123",
        role: "parent",
    });
    parentWithNoChildrenToken = signToken({
        _id: parentWithNoChildren._id,
        role: "parent",
    });

    const teacher = await User.create({
        fullName: "Teacher One",
        phoneNumber: "0600000003",
        email: "teacherone@gmail.com",
        password: "password123",
        role: "teacher",
    });
    teacherId = teacher._id;

    const student = await User.create({
        fullName: "Student One",
        phoneNumber: "0600000004",
        email: "studentone@gmail.com",
        password: "password123",
        role: "student",
    });
    studentId = student._id;

    const schoolRoom = await SchoolRoom.create({ roomNumber: 701 });

    const currentClass = await ClassModel.create({
        subjectTitle: "mathematics",
        level: "primary",
        levelYear: 3,
        teacherId,
        students: [studentId],
        schoolRoomId: schoolRoom._id,
    });
    classId = currentClass._id;

    await Guardian.create({ studentId, parentId: parent._id });

    await Grade.create({
        grade: 15,
        evaluation: "Good work",
        studentId,
        teacherId,
        classId,
    });

    await Homework.create({
        title: "Algebra exercises",
        description: "Do exercises 1 to 10",
        dueDate: new Date("2026-09-20"),
        teacherId,
        classId,
    });
});

describe("get parent students", () => {
    describe("success test cases", () => {
        test("get the logged-in parent's students successfully", async () => {
            const res = await request(app)
                .get("/api/parent/students")
                .set("Authorization", `Bearer ${parentToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("students");
            expect(res.body.students).toHaveLength(1);
            expect(res.body.students[0]._id).toBe(studentId.toString());
            expect(res.body.students[0]).not.toHaveProperty("password");
        });

        test("returns an empty list for a parent with no children", async () => {
            const res = await request(app)
                .get("/api/parent/students")
                .set("Authorization", `Bearer ${parentWithNoChildrenToken}`);
            expect(res.status).toBe(200);
            expect(res.body.students).toHaveLength(0);
        });
    });

    describe("failure test cases", () => {
        test("missing token", async () => {
            const res = await request(app).get("/api/parent/students");
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty("message");
        });

        test("forbidden role", async () => {
            const res = await request(app)
                .get("/api/parent/students")
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });
    });
});

describe("get single student", () => {
    describe("success test cases", () => {
        test("get a student's details successfully", async () => {
            const res = await request(app)
                .get(`/api/parent/students/${studentId}`)
                .set("Authorization", `Bearer ${parentToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("student");
            expect(res.body.student._id).toBe(studentId.toString());
            expect(res.body.student).not.toHaveProperty("password");
        });
    });

    describe("failure test cases", () => {
        test("missing token", async () => {
            const res = await request(app).get(
                `/api/parent/students/${studentId}`
            );
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty("message");
        });

        test("forbidden role", async () => {
            const res = await request(app)
                .get(`/api/parent/students/${studentId}`)
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });

        test("invalid student ID", async () => {
            const res = await request(app)
                .get(`/api/parent/students/1111`)
                .set("Authorization", `Bearer ${parentToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("a parent cannot access a student that isn't their child", async () => {
            const res = await request(app)
                .get(`/api/parent/students/${studentId}`)
                .set("Authorization", `Bearer ${parentWithNoChildrenToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });

        test("a parent cannot access a non-existent student", async () => {
            const res = await request(app)
                .get(`/api/parent/students/111111111111111111111111`)
                .set("Authorization", `Bearer ${parentToken}`);
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });
    });
});

describe("get student classes", () => {
    describe("success test cases", () => {
        test("get a student's classes successfully", async () => {
            const res = await request(app)
                .get(`/api/parent/students/${studentId}/classes`)
                .set("Authorization", `Bearer ${parentToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("classes");
            expect(res.body.classes).toHaveLength(1);
            expect(res.body.classes[0]._id).toBe(classId.toString());
        });
    });

    describe("failure test cases", () => {
        test("missing token", async () => {
            const res = await request(app).get(
                `/api/parent/students/${studentId}/classes`
            );
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty("message");
        });

        test("forbidden role", async () => {
            const res = await request(app)
                .get(`/api/parent/students/${studentId}/classes`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });

        test("invalid student ID", async () => {
            const res = await request(app)
                .get(`/api/parent/students/1111/classes`)
                .set("Authorization", `Bearer ${parentToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("a parent cannot access classes of a student that isn't their child", async () => {
            const res = await request(app)
                .get(`/api/parent/students/${studentId}/classes`)
                .set("Authorization", `Bearer ${parentWithNoChildrenToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });
    });
});

describe("get student grades", () => {
    describe("success test cases", () => {
        test("get a student's grades successfully", async () => {
            const res = await request(app)
                .get(`/api/parent/students/${studentId}/grades`)
                .set("Authorization", `Bearer ${parentToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("grades");
            expect(res.body.grades).toHaveLength(1);
        });
    });

    describe("failure test cases", () => {
        test("missing token", async () => {
            const res = await request(app).get(
                `/api/parent/students/${studentId}/grades`
            );
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty("message");
        });

        test("forbidden role", async () => {
            const res = await request(app)
                .get(`/api/parent/students/${studentId}/grades`)
                .set("Authorization", `Bearer ${teacherTestingToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });

        test("invalid student ID", async () => {
            const res = await request(app)
                .get(`/api/parent/students/1111/grades`)
                .set("Authorization", `Bearer ${parentToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("a parent cannot access grades of a student that isn't their child", async () => {
            const res = await request(app)
                .get(`/api/parent/students/${studentId}/grades`)
                .set("Authorization", `Bearer ${parentWithNoChildrenToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });
    });
});

describe("get student homeworks", () => {
    describe("success test cases", () => {
        test("get a student's homeworks successfully", async () => {
            const res = await request(app)
                .get(`/api/parent/students/${studentId}/homeworks`)
                .set("Authorization", `Bearer ${parentToken}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("homeworks");
            expect(res.body.homeworks).toHaveLength(1);
        });
    });

    describe("failure test cases", () => {
        test("missing token", async () => {
            const res = await request(app).get(
                `/api/parent/students/${studentId}/homeworks`
            );
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty("message");
        });

        test("forbidden role", async () => {
            const res = await request(app)
                .get(`/api/parent/students/${studentId}/homeworks`)
                .set("Authorization", `Bearer ${adminTestingToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });

        test("invalid student ID", async () => {
            const res = await request(app)
                .get(`/api/parent/students/1111/homeworks`)
                .set("Authorization", `Bearer ${parentToken}`);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        test("a parent cannot access homeworks of a student that isn't their child", async () => {
            const res = await request(app)
                .get(`/api/parent/students/${studentId}/homeworks`)
                .set("Authorization", `Bearer ${parentWithNoChildrenToken}`);
            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty("message");
        });
    });
});

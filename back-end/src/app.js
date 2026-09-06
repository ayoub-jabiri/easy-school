// External Modules
import express from "express";

// Internal Modules
import dns from "node:dns";
import userRouter from "./modules/users/user.router.js";
import subjectRouter from "./modules/subject/subject.router.js";
import schoolRoomRouter from "./modules/school-room/room.router.js";
import classRouter from "./modules/class/class.router.js";
import announcementRouter from "./modules/announcement/announcement.router.js";
import gradeRouter from "./modules/grade/grade.router.js";

// Main Settings

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// App Settings

const app = express();

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/subjects", subjectRouter);
app.use("/api/school-rooms", schoolRoomRouter);
app.use("/api/classes", classRouter);
app.use("/api/announcements", announcementRouter);
app.use("/api/grades", gradeRouter);
export default app;

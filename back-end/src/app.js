// External Modules
import express from "express";
import cors from "cors";

// Internal Modules
import dns from "node:dns";
import userRouter from "./modules/users/user.router.js";
import subjectRouter from "./modules/subject/subject.router.js";
import schoolRoomRouter from "./modules/school-room/room.router.js";
import classRouter from "./modules/class/class.router.js";
import announcementRouter from "./modules/announcement/announcement.router.js";
import gradeRouter from "./modules/grade/grade.router.js";
import homeworkRouter from "./modules/homework/homework.router.js";
import guardianRouter from "./modules/guardian/guardian.router.js";
import parentRouter from "./modules/parent/parent.router.js";
import { clientErrorResponse } from "./utils/client.responses.js";

// Main Settings

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// App Settings

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/subjects", subjectRouter);
app.use("/api/school-rooms", schoolRoomRouter);
app.use("/api/classes", classRouter);
app.use("/api/announcements", announcementRouter);
app.use("/api/grades", gradeRouter);
app.use("/api/homeworks", homeworkRouter);
app.use("/api/guardians", guardianRouter);
app.use("/api/parent", parentRouter);
app.use((req, res) => {
    return clientErrorResponse(
        res,
        404,
        `Cannot find ${req.originalUrl} on this server`
    );
});
export default app;

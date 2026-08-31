// External Modules
import express from "express";

// Internal Modules
import dns from "node:dns";
import userRouter from "./modules/users/user.router.js";
import subjectRouter from "./modules/subject/subject.router.js";
import schoolRoomRouter from "./modules/school-room/room.router.js";
import classRouter from "./modules/class/class.router.js";

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
export default app;

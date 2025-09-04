import { Router } from "express";
import {  createTask, getTasks, getUserTasks, updateTaskStatus } from "../controllers/task.controller";
import isAuthenticated from "../middlewares/isAuthenticated";

const router = Router();

router.use(isAuthenticated)
router.get("/",getTasks)
router.get("/user/:userId",getUserTasks)
router.post("/",createTask)
router.patch("/:taskId/status",updateTaskStatus)

export default router
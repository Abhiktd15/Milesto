"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = require("../controllers/task.controller");
const router = (0, express_1.Router)();
router.get("/", task_controller_1.getTasks);
router.post("/", task_controller_1.createTask);
router.patch("/:taskId/status", task_controller_1.updateTaskStatus);
exports.default = router;

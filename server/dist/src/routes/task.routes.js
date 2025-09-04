"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = require("../controllers/task.controller");
const isAuthenticated_1 = __importDefault(require("../middlewares/isAuthenticated"));
const router = (0, express_1.Router)();
router.use(isAuthenticated_1.default);
router.get("/", task_controller_1.getTasks);
router.get("/user/:userId", task_controller_1.getUserTasks);
router.post("/", task_controller_1.createTask);
router.patch("/:taskId/status", task_controller_1.updateTaskStatus);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const isAuthenticated_1 = __importDefault(require("../middlewares/isAuthenticated"));
const router = (0, express_1.Router)();
router.post("/new", user_controller_1.createUser);
router.post("/login", user_controller_1.login);
router.use(isAuthenticated_1.default);
router.get("/me", user_controller_1.isAuthorized);
exports.default = router;

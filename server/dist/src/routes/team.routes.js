"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_controller_1 = require("../controllers/team.controller");
const isAuthenticated_1 = __importDefault(require("../middlewares/isAuthenticated"));
const router = (0, express_1.Router)();
router.use(isAuthenticated_1.default);
router.post('/new', team_controller_1.createTeam);
router.get("/", team_controller_1.getTeams);
exports.default = router;

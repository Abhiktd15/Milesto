"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_controller_1 = require("../controllers/team.controller");
const router = (0, express_1.Router)();
router.get("/", team_controller_1.getTeams);
exports.default = router;

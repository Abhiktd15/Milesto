"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProject = exports.getProjects = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.id;
    try {
        const projects = yield prisma.project.findMany();
        res.json(projects);
    }
    catch (error) {
        res.status(500).json({
            message: `Error Retrieving Projects ${error.message}`
        });
    }
});
exports.getProjects = getProjects;
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teamId, name, description, startDate, endDate } = req.body;
    console.log(teamId);
    try {
        const newProject = yield prisma.project.create({
            data: {
                name,
                description,
                startDate,
                endDate
            }
        });
        const projectTeam = yield prisma.projectTeam.create({
            data: {
                teamId,
                projectId: newProject.id
            }
        });
        console.log(projectTeam);
        res.status(201).json({ newProject, projectTeam });
    }
    catch (error) {
        res.status(500).json({
            message: `Error Creating Projects ${error.message}`
        });
    }
});
exports.createProject = createProject;

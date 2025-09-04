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
exports.getTeams = exports.createTeam = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.id;
    const { projectManagerUserId, teamName } = req.body;
    try {
        const teams = yield prisma.team.create({
            data: {
                productOwnerUserId: Number(userId),
                projectManagerUserId: projectManagerUserId || null,
                teamName
            }
        });
        res.status(201).json(teams);
    }
    catch (error) {
        res.status(500).json({
            message: `Error Retrieving Teams ${error.message}`,
        });
    }
});
exports.createTeam = createTeam;
const getTeams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId } = req.query;
    try {
        const teams = yield prisma.team.findMany();
        const teamsWithUsername = yield Promise.all(teams.map((team) => __awaiter(void 0, void 0, void 0, function* () {
            const productOwner = yield prisma.user.findUnique({
                where: { userId: team.productOwnerUserId },
                select: { username: true }
            });
            let projectManager = null;
            if (team.projectManagerUserId !== null && team.projectManagerUserId !== undefined) {
                projectManager = yield prisma.user.findUnique({
                    where: { userId: team.projectManagerUserId },
                    select: { username: true }
                });
            }
            return Object.assign(Object.assign({}, team), { productOwnerUsername: productOwner === null || productOwner === void 0 ? void 0 : productOwner.username, projectManagerUsername: projectManager === null || projectManager === void 0 ? void 0 : projectManager.username });
        })));
        res.json(teamsWithUsername);
    }
    catch (error) {
        res.status(500).json({
            message: `Error Retrieving Teams ${error.message}`,
        });
    }
});
exports.getTeams = getTeams;

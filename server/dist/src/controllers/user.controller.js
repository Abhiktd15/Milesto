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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.isAuthorized = exports.getUsers = exports.login = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import { AuthenticatedRequest } from "../middlewares/isAuthenticated";
const prisma = new client_1.PrismaClient();
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400).json({
            message: "All Fields are required"
        });
        return;
    }
    try {
        const alreadyExists = yield prisma.user.findUnique({
            where: { email }
        });
        if (alreadyExists) {
            res.status(400).json({
                message: "User already Exists"
            });
            return;
        }
        const encyptedPassword = yield bcryptjs_1.default.hash(password, Number(process.env.PASSWORD_HASH));
        const user = yield prisma.user.create({
            data: {
                email,
                password: encyptedPassword,
                username,
                profilePictureUrl: ""
            }
        });
        const tokenData = {
            userId: user.userId
        };
        const token = yield jsonwebtoken_1.default.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
        res.status(201)
            .cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: false
        })
            .json({
            message: "User created Successfully",
            user,
            success: true
        });
    }
    catch (error) {
        res.status(500).json({
            message: `Error Creating Tasks ${error.message}`,
        });
    }
});
exports.createUser = createUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({
            message: "All Fields are required"
        });
        return;
    }
    try {
        let user = yield prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            res.status(404).json({
                message: "User Doesn't Exists!"
            });
            return;
        }
        const isPasswordMatch = yield bcryptjs_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
        if (!isPasswordMatch) {
            res.status(400).json({
                message: "Invalid Credentials"
            });
            return;
        }
        const tokenData = {
            userId: user === null || user === void 0 ? void 0 : user.userId
        };
        const token = yield jsonwebtoken_1.default.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
        user = {
            userId: Number(user === null || user === void 0 ? void 0 : user.userId),
            email: user === null || user === void 0 ? void 0 : user.email,
            password: "",
            profilePictureUrl: (user === null || user === void 0 ? void 0 : user.profilePictureUrl) || "",
            username: user === null || user === void 0 ? void 0 : user.username,
            teamId: (user === null || user === void 0 ? void 0 : user.teamId) !== undefined && (user === null || user === void 0 ? void 0 : user.teamId) !== null ? Number(user === null || user === void 0 ? void 0 : user.teamId) : null,
        };
        res.status(201)
            .cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: false
        })
            .json({
            message: `Welcome Back! ${user === null || user === void 0 ? void 0 : user.username}`,
            user,
        });
    }
    catch (error) {
        res.status(500).json({
            message: `Error Logging in the user ${error.message}`,
        });
    }
});
exports.login = login;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId } = req.query;
    try {
        const users = yield prisma.user.findMany();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({
            message: `Error Retrieving Tasks ${error.message}`,
        });
    }
});
exports.getUsers = getUsers;
const isAuthorized = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.id;
    const user = yield prisma.user.findUnique({
        where: { userId: Number(userId) },
        select: {
            userId: true,
            email: true,
            username: true,
            profilePictureUrl: true,
            teamId: true,
            team: true
        },
    });
    if (!user) {
        res.status(404).json({
            message: "User not found !"
        });
        return;
    }
    res.status(200).json(user);
});
exports.isAuthorized = isAuthorized;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(201)
        .cookie("token", "", {
        maxAge: 0
    })
        .json({
        message: "Successfully Logged Out!"
    });
});
exports.logout = logout;

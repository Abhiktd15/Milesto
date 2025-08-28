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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({
            message: "User not authenticated! Please Login to continue..."
        });
        return;
    }
    try {
        const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        if (typeof decode === 'object' && decode && 'userId' in decode) {
            req.id = decode.userId;
            next();
        }
        else {
            res.status(401).json({ message: "Invalid Token!" });
            return;
        }
    }
    catch (err) {
        res.status(401).json({
            message: "Invalid or expired token!"
        });
        return;
    }
});
exports.default = isAuthenticated;

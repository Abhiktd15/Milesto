import express, { Router } from "express";
import { createUser, getUsers, isAuthorized, login, logout } from "../controllers/user.controller";
import isAuthenticated from "../middlewares/isAuthenticated";

const router = Router();
router.post("/new",createUser)
router.post("/login",login)

router.get('/',getUsers)
router.get('/logout',logout)

router.use(isAuthenticated)
router.get("/me",isAuthorized)
export default router
import { Router } from "express";
import { createProject, getProjects } from "../controllers/project.controller";
import isAuthenticated from "../middlewares/isAuthenticated";

const router = Router();

router.use(isAuthenticated)
router.get("/",getProjects)
router.post("/",createProject)

export default router
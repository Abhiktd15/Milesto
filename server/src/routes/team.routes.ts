import { Router } from "express";
import { createTeam, getTeams } from "../controllers/team.controller";
import { isAuthorized } from "../controllers/user.controller";
import isAuthenticated from "../middlewares/isAuthenticated";

const router = Router();

router.use(isAuthenticated);
router.post('/new',createTeam)
router.get("/",getTeams)

export default router
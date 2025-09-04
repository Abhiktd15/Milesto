import { Router } from "express";
import { search } from "../controllers/search.controller";
import isAuthenticated from "../middlewares/isAuthenticated";

const router = Router();

router.use(isAuthenticated)
router.get("/",search) 

export default router
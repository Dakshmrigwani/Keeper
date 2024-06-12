// routes/reminder.routes.js
import { Router } from "express";
import { deletePermanently } from "../controllers/notes.controller.js";
import {getAllTrash} from "../controllers/trash.controllers.js"

import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();
router.use(verifyJWT);

router.delete("/trash", deletePermanently);
router.get("/getAllTrash" , getAllTrash)

export default router;

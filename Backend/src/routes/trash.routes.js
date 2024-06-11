// routes/reminder.routes.js
import { Router } from "express";
import { deletePermanently } from "../controllers/notes.controller.js";
import {getAllTrash} from "../controllers/trash.controllers.js"

const router = Router();

router.delete("/trash", deletePermanently);
router.get("/getAllTrash" , getAllTrash)

export default router;

// routes/notes.js
import { Router } from "express";
import { getArchieve , addArchieve } from "../controllers/archieve.controllers.js";

const router = Router();

router.get("/getArchieve", getArchieve);
router.put("/addArchieve" , addArchieve);

export default router;

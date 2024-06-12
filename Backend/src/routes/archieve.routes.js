// routes/notes.js
import { Router } from "express";
import { getArchieve , addArchieve } from "../controllers/archieve.controllers.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();
router.use(verifyJWT);

router.get("/getArchieve", getArchieve);
router.put("/addArchieve" , addArchieve);

export default router;

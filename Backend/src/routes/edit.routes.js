import { Router } from "express";
import { addEdit , deleteEdit , getAllEdit } from "../controllers/edit.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();
router.use(verifyJWT);
router.get("/getAllEdit", getAllEdit);
router.post("/addEdit", addEdit);
router.delete("/:id/deleteEdit", deleteEdit);

export default router;
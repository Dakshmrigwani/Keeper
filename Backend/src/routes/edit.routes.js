import { Router } from "express";
import { addEdit , deleteEdit , getAllEdit } from "../controllers/edit.controllers.js";

const router = Router();

router.get("/getAllEdit", getAllEdit);
router.post("/addEdit", addEdit);
router.delete("/:id/deleteEdit", deleteEdit);

export default router;
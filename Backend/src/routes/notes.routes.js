// routes/notes.js
import { Router } from "express";
import {
  addNote,
  UpdateNote,
  getAllNotes,
  deleteData,
  restoreTrash,
  transferTrash,
  archieveNote,
  UnArchieveNote,
} from "../controllers/notes.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/multer.middleware.js";

const router = Router();
router.use(verifyJWT);

router.post(
  "/addNote",
  upload.fields([
    {
        name: "image",
        maxCount: 1
    }, 
]),
  addNote
);
router.put("/UpdateNote/:id",  UpdateNote);
router.get("/getNote", getAllNotes);
router.post("trash", transferTrash);
router.put("/:id/restore", restoreTrash);
router.delete("/:id", deleteData);
router.patch("/:id/archive" , archieveNote);
router.patch("/:id/Unarchive" , UnArchieveNote);

export default router;
// routes/notes.js
import { Router } from "express";
import {
  addNote,
  UpdateNote,
  getAllNotes,
  deleteData,
  restoreTrash,
  deletePermanently,
  archieveNote,
  archieveData,
  UnArchieveNote,
  PinnedNote,
  UnPinnedNote,
  PinnedData
} from "../controllers/notes.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
router.use(verifyJWT);

router.post(
  "/addNote",
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  addNote
);
router.put("/UpdateNote/:id", UpdateNote);
router.get("/getNote", getAllNotes);
router.get("/PinnedData", PinnedData);
router.delete("/:id/deletePermanently", deletePermanently);
router.patch("/:id/restore", restoreTrash);
router.get("/archieveData", archieveData);
router.patch("/:id/UnArchieveNote", UnArchieveNote);
router.patch("/:id/PinnedNote", PinnedNote);
router.patch("/:id/UnPinnedNote", UnPinnedNote);
router.patch("/:id/deleteData", deleteData);
router.patch("/:id/archive", archieveNote);
// router.patch("/:id/Unarchive" , UnArchieveNote);

export default router;

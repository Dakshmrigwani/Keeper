// routes/notes.js
import { Router } from "express";
import {
  addNote,
  updateNote,
  getAllPinned,
  deleteData,
} from "../controllers/pinned.controllers.js";

const router = Router();

router.post(
  "/addNote",
  addNote
);
router.post("/updateNote", updateNote);
router.get("/getAllPinned", getAllPinned);
router.delete("/:id", deleteData);
router.post("/updateNote", updateNote);
// router.post(
//   "/image",

// );

export default router;

// import {Router} from "express"
// import {addNote , updateNote} from "../controllers/notes.controller.js"

// const router = Router()

// router.route("/addNote").post(addNote)
// router.route("/updatedNotes").post(updateNote)

// export default router

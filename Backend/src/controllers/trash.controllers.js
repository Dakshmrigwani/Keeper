import { Trash } from "../models/trash.models.js";
import { Notes } from "../models/notes.models.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

export const getAllTrash = AsyncHandler(async (req, res) => {
  try {
    const allData = await Notes.find({ isTrash: true });
    res.status(200).json(allData);
  } catch (error) {
    res.status(400).json({ message: "cannot get delete data" });
  }
});

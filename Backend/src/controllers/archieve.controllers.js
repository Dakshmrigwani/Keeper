import { Archieve } from "../models/archieve.models.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { Notes } from "../models/notes.models.js";

export const addArchieve = AsyncHandler(async (req, res) => {
  try {
    const { main, title } = req.body;
    console.log(`Received request to add Archieve: ${title} - ${main}`);
    const NewData = new Archieve({
      title: title,
      main: main,
    });
    const SavedData = await NewData.save();

    res.status(201).json(SavedData);
  } catch (error) {
    console.error("Error while adding data", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export const getArchieve = AsyncHandler(async (req, res) => {
  try {

    const archieve = await Archieve.find({}); // Retrieve all data from the Archieve collection

    console.log(archieve);
    res.status(200).json(archieve);
  } catch (error) {
    console.error("Error occurred while getting data", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

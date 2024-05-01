import { Archieve } from "../models/archieve.models.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { Notes } from "../models/notes.models.js";

export const addArchieve = AsyncHandler(async (req, res) => {
  try {
    const { main, title } = req.body;
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
    const aggregateData = await Notes.aggregate(
      [
      {
        $match: { isArchieved: true },
      },
      {
        $lookup: {
          from: "archieves", // Name of the second collection
          localField: "_id", // Field from the first collection
          foreignField: "noteId", // Field from the second collection
          as: "archieveData", // Alias for the result
        },
      },
    ]
  ).exec();
    const archieve = await Archieve.find(); // Retrieve all data from the Archieve collection

    console.log(aggregateData);
    res.status(200).json(aggregateData);
  } catch (error) {
    console.error("Error occurred while getting data", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

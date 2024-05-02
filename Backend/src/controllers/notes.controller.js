// controllers/notes.controller.js
import { Notes } from "../models/notes.models.js";
import { Archieve} from "../models/archieve.models.js"
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";



export const addNote = AsyncHandler(async (req, res) => {
  try {
    const { title, main } = req.body;

    let imageURL = null;

    // Check if an image file was uploaded
    if (req.files && req.files['image']) {
      const imageFile = req.files['image'][0]; // Retrieve the uploaded image file
      console.log("Image File:", imageFile); // Log the uploaded image file

      // Upload the image to Cloudinary and get the URL
      const cloudinaryUploadResult = await uploadOnCloudinary(imageFile.path);
      console.log("Cloudinary Upload Result:", cloudinaryUploadResult); // Log the Cloudinary upload result

      if (cloudinaryUploadResult) {
        imageURL = cloudinaryUploadResult.secure_url; // Get the secure URL of the uploaded image
      }
    }

    // Create a new note instance with the retrieved fields
    const newNote = new Notes({
      title: title,
      main: main,
      image: imageURL, // Save the Cloudinary URL of the uploaded image
    });

    // Save the new note to the database
    const savedNote = await newNote.save();

    // Send a success response with the saved note
    res.status(201).json(savedNote);
  } catch (error) {
    // If an error occurs, handle it and send an error response
    console.error("Error while adding note:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


export const getAllNotes = AsyncHandler(async (req, res) => {
  try {
    // const {userId} = req.body
    const allNotes = await Notes.find({ userId: req.userId });
    res.status(200).json(allNotes);
  } catch (err) {
    res.status(404).json("cannot get all data");
  }
});

export const transferTrash = AsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Notes.findByIdAndUpdate(
      id,
      { deleted: true, deletedAt: Date.now() },
      { new: true }
    );
    res.json(note);
  } catch {
    res.status(500).json({ message: error.message });
  }
});

export const restoreTrash = AsyncHandler(async (req, res) => {
  try {
    const note = await Notes.findByIdAndUpdate(
      id,
      { deleted: false, deletedAt: null },
      { new: true }
    );
    res.json(note);
  } catch {
    res.status(500).json({ message: error.message });
  }
});

export const deleteData = AsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deleteNote = await Notes.findByIdAndDelete(id);
    if (!deleteNote) {
      console.log("Notes not found");
    }
    res.status(200).json({ message: "Note deleted successfully", deleteNote });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// export const UpdateData = async (req , res) => {
//   try {
//     const {id , title , main} = req.body
//     const updateData = await Notes.findByIdAndUpdate(id)
//     if (!updateData){
//       console.log("data is not found");
//     }
//     res.status(200).json({message : "data updated successfully" , updateData})
//   } catch (error) {
//     console.log("data is not updated" , error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// }

export const UpdateNote = AsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { title, main } = req.body;

    // Find the note by id and update both title and main text
    const updatedNote = await Notes.findByIdAndUpdate(id, { title, main }, { new: true });

    // Check if the note exists
    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // If the note is updated successfully, return the updated note
    res.status(200).json(updatedNote);
  } catch (error) {
    // If an error occurs, return an error response
    console.error('Error while updating note:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


export const archieveNote = AsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Notes.findById(id); // Use the 'Notes' model here
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    note.isArchieved = true; // Update the 'isArchived' property of the 'note'
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export const UnArchieveNote = AsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Notes.findById(id); // Use the 'Notes' model here
    if (!note || !note.isArchived) {
      return res.status(404).json({ message: 'Note not found in archive' });
    }
    note.isArchieved = false; // Update the 'isArchived' property of the 'note'
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


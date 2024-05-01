// controllers/Pinned.controller.js
import { Pinned } from "../models/pinned.models.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"

export const addNote = async (req, res) => {
  try {
    const { title, main , image } = req.body;
    

    // const imageURLs = await Promise.all(images.map(async (image) => {
    //   const imagePath = image.path;
    //   const uploadedImage = await uploadOnCloudinary(imagePath);
    //   return uploadedImage.secure_url; // Assuming secure_url is the URL of the uploaded image
    // }));


    const newData = new Pinned({ title, main , image});
    await newData.save();
    res.status(201).json({ message: "Note added successfully", newData });
  } catch (error) {
    console.error("Error while adding data", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, main , image } = req.body;
    const updatedNote = await Pinned.findByIdAndUpdate(
      id,
      { title, main, image }, // Include main field here
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note updated successfully", updatedNote });
  } catch (error) {
    console.error("Error while updating data", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllPinned = async (req, res) => {
  try {
    const allPinned = await Pinned.find();
    res.status(200).json(allPinned);
  } catch (err) {
    res.status(404).json("cannot get all data");
  }
};

export const deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteNote = await Pinned.findByIdAndDelete(id)
    if(!deleteNote){
      console.log("Pinned not found");
    }
    res.status(200).json({ message: "Note deleted successfully", deleteNote });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// export const UpdateData = async (req , res) => {
//   try {
//     const {id , title , main} = req.body
//     const updateData = await Pinned.findByIdAndUpdate(id)
//     if (!updateData){
//       console.log("data is not found");
//     }
//     res.status(200).json({message : "data updated successfully" , updateData})
//   } catch (error) {
//     console.log("data is not updated" , error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// }

export const UpdateNote = async (req, res) => {
  try {
    const { id, title, main } = req.body;
    const updatedNote = await Pinned.findByIdAndUpdate(
      id,
      { title, main },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note updated successfully", updatedNote });
  } catch (error) {
    console.error("Error while updating note:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
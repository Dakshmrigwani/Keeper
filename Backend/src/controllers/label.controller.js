import { Labels } from "../models/label.models.js";

export const addLabel = async (req, res) => {
  try {
    const { title, main } = req.body;
  } catch (error) {
    console.log("Error saving label:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

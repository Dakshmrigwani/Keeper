import { Reminder } from "../models/reminder.models.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

// controllers/reminder.controller.js
export const addReminder = AsyncHandler(async (req, res) => {
  try {
    const { title, main } = req.body;

    // Create a new reminder instance with title and main
    const newReminder = new Reminder({
      title: title,
      main: main,
    });

    // Save the reminder to the database
    const savedReminder = await newReminder.save();

    // Send a success response
    res.status(200).json(savedReminder);
  } catch (error) {
    console.log("Error saving reminder:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export const getAllReminders = AsyncHandler(async (req, res) => {
  try {
    // Fetch all reminders from the database (assuming you have a Reminder model)
    const reminders = await Reminder.find();

    // If reminders are found, send them in the response
    res.status(200).json(reminders);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export const deleteReminder = AsyncHandler(async (req, res) => {
  try {
    const { _id } = req.params; // Change from req.body to req.params
    console.log("_id", _id);

    const deleteReminder = await Reminder.findByIdAndDelete(_id);
    console.log("deleteReminder", deleteReminder);

    if (!deleteReminder) {
      console.log("Reminder not found for ID:", _id);
      return res.status(404).json({ message: "Reminder not found" });
    }

    console.log("Reminder deleted successfully:", deleteReminder);
    res
      .status(200)
      .json({ message: "Reminder deleted successfully", deleteReminder });
  } catch (error) {
    console.error("Error deleting reminder:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export const archieveReminder = AsyncHandler(async (req, res) => {
  try {
    const Reminder = await Reminder.findById(req.params._id);
    Reminder.isArchived = true;
    await Reminder.save();
    res.json(Reminder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export const UnArchieveReminder = AsyncHandler(async (req, res) => {
  try {
    const Reminder = await Reminder.findById(req.params._id);
    Reminder.isArchieved = false;
    await Reminder.save();
    res.json(Reminder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

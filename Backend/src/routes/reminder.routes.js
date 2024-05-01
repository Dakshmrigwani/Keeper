// routes/reminder.routes.js
import { Router } from "express";

import { addReminder, deleteReminder, getAllReminders , archieveReminder , UnArchieveReminder } from "../controllers/reminder.controller.js"; // Import the controller functions

const router = Router();

// Define the route for adding a reminder
router.post("/addReminder", addReminder);

// Define the route for getting all reminders
router.get("/getReminders", getAllReminders);

router.put("/:id/archive" , archieveReminder);

router.put("/:id/Unarchive" , UnArchieveReminder);

router.delete("/deleteReminder/:_id" , deleteReminder)

export default router;

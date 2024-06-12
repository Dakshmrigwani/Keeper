// routes/reminder.routes.js
import { Router } from "express";

import { addReminder, deleteReminder, getAllReminders , archieveReminder , UnArchieveReminder } from "../controllers/reminder.controller.js"; // Import the controller functions

import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();
router.use(verifyJWT);

// Define the route for adding a reminder
router.post("/addReminder", addReminder);

// Define the route for getting all reminders
router.get("/getReminders", getAllReminders);

router.put("/:id/archive" , archieveReminder);

router.put("/:id/Unarchive" , UnArchieveReminder);

router.delete("/deleteReminder/:_id" , deleteReminder)

export default router;

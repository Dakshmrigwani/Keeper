import mongoose from "mongoose";

const { Schema } = mongoose;

const ReminderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required:true,
  },
  title: {
    type: String,
    required: true,
  },
  main: {
    type: String,
    required: true,
  },
  isArchieved: {
    type: Boolean,
    default: false
  },
  isTrash:{
    type:Boolean,
    default:false,
  }
});

export const Reminder = mongoose.model("Reminders", ReminderSchema);

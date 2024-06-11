
import mongoose from "mongoose";

const { Schema } = mongoose;

const editSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
   
  },
  {
    timestamps: true,
  }
);

export const Edit = mongoose.model("Edit", editSchema);

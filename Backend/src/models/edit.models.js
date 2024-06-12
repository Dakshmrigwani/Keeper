
import mongoose from "mongoose";

const { Schema } = mongoose;

const editSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
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

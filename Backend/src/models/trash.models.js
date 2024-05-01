import mongoose from "mongoose";

const { Schema } = mongoose;

const trashSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    main: {
      type: String,
      required: true,
    },
    image:{
      type:String,
    }
   
   
  },
  {
    timestamps: true,
  }
);

export const Trash = mongoose.model("Trash", trashSchema);

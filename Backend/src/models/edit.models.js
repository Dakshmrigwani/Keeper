
import mongoose from "mongoose";

const { Schema } = mongoose;

const editSchema = new Schema(
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

export const Notes = mongoose.model("Notes", editSchema);

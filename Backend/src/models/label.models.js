
import mongoose from "mongoose";

const { Schema } = mongoose;

const labelSchema = new Schema(
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

export const Labels = mongoose.model("Labels", labelSchema);

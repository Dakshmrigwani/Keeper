
import mongoose from "mongoose";

const { Schema } = mongoose;

const archieveSchema = new Schema(
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

export const Archieve = mongoose.model("Archieve", archieveSchema);



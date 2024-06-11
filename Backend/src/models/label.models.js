
import mongoose from "mongoose";
import {Edit} from "./edit.models.js"

const { Schema } = mongoose;

const labelSchema = new Schema(
  {
    // userId: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    //   required:true,
    // },
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
    },
    label: {
      type: Schema.Types.ObjectId,
      ref: 'Edit',
    },
   
  },
  {
    timestamps: true,
  }
);

export const Labels = mongoose.model("Labels", labelSchema);

import mongoose from "mongoose";

const { Schema } = mongoose;

const trashSchema = new Schema(
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
    }
   
   
  },
  {
    timestamps: true,
  }
);

export const Trash = mongoose.model("Trash", trashSchema);

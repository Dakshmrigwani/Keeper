// models/notes.models.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const pinnedSchema = new Schema(
  {
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
    image:{
      type:String,
    },
    isArchieved: {
      type: Boolean,
      default: false
    },
    isTrash:{
      type:Boolean,
      default:false,
    }
   
   
  },
  {
    timestamps: true,
  }
);

export const Pinned = mongoose.model("Pinned", pinnedSchema);

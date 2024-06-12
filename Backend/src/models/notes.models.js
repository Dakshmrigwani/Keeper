// models/notes.models.js
import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const { Schema } = mongoose;

const notesSchema = new Schema(
  {
    user: {
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
    image: {
      type: String,
    },
    isArchieved: {
      type: Boolean,
      default: false,
    },
    isTrash: {
      type: Boolean,
      default: false,
    },
    isPinned:{
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

notesSchema.plugin(mongooseAggregatePaginate)

export const Notes = mongoose.model("Notes", notesSchema);

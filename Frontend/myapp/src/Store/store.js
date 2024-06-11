import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "../Slice/NoteSlice";

import EditReducer from "../Slice/EditSlice";
import ArchieveReducer from "../Slice/ArchieveSlice";
import remindReducer from "../Slice/RemindSlice";

export const store = configureStore({
  reducer: {
    note: noteReducer,
    Edit: EditReducer,
    archieve: ArchieveReducer,
    reminder: remindReducer,
  },
});

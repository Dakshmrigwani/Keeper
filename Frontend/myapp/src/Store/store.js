// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slice/authSlice";
import noteReducer from "../Slice/NoteSlice";
import thunk from 'redux-thunk';
import EditReducer from "../Slice/EditSlice";
import ArchieveReducer from "../Slice/ArchieveSlice";
import remindReducer from "../Slice/RemindSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    note: noteReducer,
    Edit: EditReducer,
    archieve: ArchieveReducer,
    reminder: remindReducer,
  },
  
});

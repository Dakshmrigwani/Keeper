import {configureStore} from '@reduxjs/toolkit';
import noteReducer from '../Slice/NoteSlice';
import TrashReducer from "../Slice/TrashSlice";
import LabelReducer from "../Slice/LabelSlice"
import ArchieveReducer from "../Slice/ArchieveSlice"
import remindReducer from "../Slice/RemindSlice"



export const store = configureStore({
    reducer: {
        note: noteReducer,
        Trash: TrashReducer,
        Label: LabelReducer,
        archieve: ArchieveReducer,
        reminder: remindReducer
      }
})



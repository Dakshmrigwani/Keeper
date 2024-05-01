import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { notesapi, archieveapi } from "../api";
import axios from "axios";

// Initial state with notesArray, PinnedArray, and FilteredArray
const initialState = {
  notesArray: [],
  PinnedArray: [],
  FilteredArray: [],
  updateState: false,
  loading: false,
  error: "",
  response: "",
};

export const fetchNotes = createAsyncThunk("note/getNotes", async (data) => {
  const response = await axios.get(`${notesapi}/getNote`, data);
  console.log(response.data);
  return response.data;
});

export const addNotes = createAsyncThunk(
  "notes/addNote",
  async ({ title, main, image }) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("main", main);
      formData.append("image", image);
      console.log(formData)

      const response = await axios.post(`${notesapi}/addNote`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {}
  }
);

export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async ({ id, newTitle, newText }) => {
    try {
      const response = await axios.put(`${notesapi}/UpdateNote/${id}`, {
        title: newTitle,
        main: newText,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteNote = createAsyncThunk("notes/deleteNote ", async (_id) => {
  try {
    await axios.delete(`${notesapi}/deleteNote/${_id}`);
    return _id; // Return _id upon successful deletion
  } catch (error) {
    throw error;
  }
});

export const archiveNote = createAsyncThunk(
  "notes/archiveNote",
  async (_id) => {
    try {
      const response = await axios.patch(`${notesapi}/${_id}/archive/`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      // Handle any errors here
      console.error("Error archiving note:", error);
      throw error; // Throw the error to be caught by the rejected action
    }
  }
);

export const unarchiveNote = createAsyncThunk(
  "notes/unarchiveNote",
  async (_id) => {
    const response = await axios.put(`${notesapi}/${_id}/unarchive/`);
    return response.data;
  }
);
export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    changeStateTrue: (state) => {
      state.updateState = true;
    },
    changeStateFalse: (state) => {
      state.updateState = false;
    },
    clearResponse: (state) => {
      state.response = "";
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.notesArray = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.error = state.error.message;
      });
    builder
      .addCase(addNotes.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notesArray.push(action.payload);
        state.response = "add";
      })
      .addCase(addNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = state.error.message;
      });
    builder.addCase(updateNote.fulfilled, (state, action) => {
      const updatedNote = action.payload;
      const index = state.notesArray.findIndex(
        (note) => note._id === updatedNote._id
      );
      if (index !== -1) {
        state.notesArray[index] = updatedNote; // Update the note in the state
      }
    });
    builder.addCase(deleteNote.fulfilled, (state, action) => {
      // Filter out the deleted note from the state
      state.notesArray = state.notesArray.filter(
        (item) => item._id !== action.payload
      );
    });
    builder.addCase(archiveNote.fulfilled, (state, action) => {
      const updatedNotesArray = state.notesArray.map((note) => {
        if (note._id === action.payload._id) {
          return { ...note, isArchived: true }; // Set isArchived to true for the archived note
        }
        return note;
      });
      state.notesArray = updatedNotesArray;
    });

    builder.addCase(unarchiveNote.fulfilled, (state, action) => {
      const updatedNotesArray = state.notesArray.map((note) => {
        if (note._id === action.payload._id) {
          return { ...note, isArchived: false }; // Update the note's isArchived property
        }
        return note;
      });
      state.notesArray = updatedNotesArray;
    });
  },
});

export const {
  removeNote,
  editNote,
  addPinnedNote,
  removePinnedNote,
  editPinnedNote,
  editFilteredNote,
  deleteFilteredNote,
} = noteSlice.actions;

export default noteSlice.reducer;

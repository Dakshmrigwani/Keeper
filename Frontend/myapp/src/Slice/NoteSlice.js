import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { notesapi, archieveapi } from "../api";
import axiosInstance from "../Pages/axiosInstance";
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

const getToken = () => localStorage.getItem("accessToken");

export const fetchNotes = createAsyncThunk(
  "note/getNotes",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${notesapi}/getNote`, {
        headers: {
          Authorization: `Bearer ${getToken()}`, // Include token in headers
        },
      });
      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data); // Handle error
    }
  }
);

export const addNotes = createAsyncThunk(
  "notes/addNote",
  async ({ title, main, image }) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("main", main);
      formData.append("image", image);
      formData.append("isPinned", false); // Add this line to set isPinned to false

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

export const restoreTrash = createAsyncThunk("notes/restore", async (_id) => {
  try {
    const response = await axios.patch(`${notesapi}/${_id}/restore`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error restoring note:", error);
    throw error; // Throw the error to be caught by the rejected action
  }
});

export const deleteNote = createAsyncThunk("notes/deleteNote ", async (_id) => {
  try {
    const response = await axios.patch(`${notesapi}/${_id}/deleteData`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error; // Throw the error to be caught by the rejected action
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

export const deletePermanently = createAsyncThunk(
  "notes/deletePermanently",
  async (_id) => {
    try {
      const response = await axios.delete(
        `${notesapi}/${_id}/deletePermanently`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error; // Throw the error to be caught by the rejected action
    }
  }
);

export const addPinned = createAsyncThunk(
  "notes/addPinnedNote",
  async (_id) => {
    try {
      const response = await axios.patch(`${notesapi}/${_id}/PinnedNote/`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error Pinned note:", error);
      throw error; // Throw the error to be caught by the rejected action
    }
  }
);

export const unPinned = createAsyncThunk(
  "notes/UnPinnedNote",
  async (_id) => {
    try {
      const response = await axios.patch(`${notesapi}/${_id}/UnPinnedNote/`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error Pinned note:", error);
      throw error; // Throw the error to be caught by the rejected action
    }
  }
);

// export const fetchPinned = createAsyncThunk(
//   "notes/PinnedData",
//   async (data) => {
//     const response = await axios.get(`${notesapi}/PinnedData`, data);
//     console.log("PinnedData" , response.data);
//     return response.data;
//   }
// );

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

      // builder.addCase(fetchPinned.fulfilled, (state, action) => {
      //   state.notesArray = action.payload;
      // });

      
      builder.addCase(addPinned.fulfilled, (state, action) => {
        const updatedNotesArray = state.notesArray.map((note) => {
          if (note._id === action.payload._id) {
            return { ...note, isPinned: true }; // Set isArchived to true for the archived note
          }
          return note;
        });
        state.notesArray = updatedNotesArray;
      });
  

    builder.addCase(unPinned.fulfilled, (state, action) => {
      const updatedNotesArray = state.notesArray.map((note) => {
        if (note._id === action.payload._id) {
          return { ...note, isPinned: false }; // Update the note's isArchived property
        }
        return note;
      });
      state.notesArray = updatedNotesArray;
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
      const updatedNotesArray = state.notesArray.map((note) => {
        if (note._id === action.payload._id) {
          return { ...note, isTrash: true };
        }
        return note;
      });
      state.notesArray = updatedNotesArray;
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

    builder.addCase(restoreTrash.fulfilled, (state, action) => {
      const updatedNotesArray = state.notesArray.map((note) => {
        if (note._id === action.payload._id) {
          return { ...note, isTrash: false };
        }
        return note;
      });
      state.notesArray = updatedNotesArray;
    });

    builder.addCase(deletePermanently.fulfilled, (state, action) => {
      state.updateState = false;
      const index = state.notesArray.findIndex(
        (note) => note._id === action.payload._id
      );
      if (index !== -1) {
        state.notesArray.splice(index, 1);
      }
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

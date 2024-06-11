import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { archieveapi, notesapi } from "../api";
import axios from "axios";

const initialState = {
  archieveArray: [],
  updateState: false,
  loading: false,
  error: "",
  response: "",
};

export const addArchieve = createAsyncThunk(
  "archieve/addArchieve",
  async (data) => {
    const response = await axios.post(`${archieveapi}/addArchieve`, data);
    console.log(response.data);
    return response.data;
  }
);

export const fetchArchieve = createAsyncThunk(
  "archieve/archieveData",
  async (data) => {
    const response = await axios.get(`${notesapi}/archieveData`, data);
    console.log("archieve" , response.data);
    return response.data;
  }
);

export const ArchieveSlice = createSlice({
  name: "archieve",
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
      .addCase(fetchArchieve.fulfilled, (state, action) => {
        state.archieveArray = action.payload;
        state.loading = false;
      })
      .addCase(fetchArchieve.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
    builder
      .addCase(addArchieve.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addArchieve.fulfilled, (state, action) => {
        state.loading = false;
        state.archieveArray.push(action.payload);
        state.response = "add";
      })
      .addCase(addArchieve.rejected, (state, action) => {
        state.loading = false;
        state.error = state.error.message;
      });
  },
});

export default ArchieveSlice.reducer;

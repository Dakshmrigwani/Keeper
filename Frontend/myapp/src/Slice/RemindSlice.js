import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { reminderapi } from "../api";
import axios from "axios"

const initialState = {
  remindArray: [],
  updateState: false,
  loading: false,
  error: "",
  response: "",
};


export const FetchReminder = createAsyncThunk("reminder/getReminders" , async(data) => {
  const response = await axios.get(`${reminderapi}/getReminders` , data);
  console.log(response.data);
  return response.data;
})

export const addReminder = createAsyncThunk(
  "reminder/addReminder",
  async (data) => {
    const response = await axios.post(`${reminderapi}/addReminder`, data);
    return response.data;
  }
);

export const deleteReminder = createAsyncThunk(
  "reminder/deleteReminder",
  
  async (_id) => {
    try {
      await axios.delete(`${reminderapi}/deleteReminder/${_id}`);
      return _id; // Return _id upon successful deletion
    } catch (error) {
      throw error;
    }
  }
);


export const remindSlice = createSlice({
    name: "reminder",
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
      .addCase(FetchReminder.fulfilled, (state , action) => {
        state.remindArray = action.payload;
      })
     
      .addCase(FetchReminder.rejected, (state, action) => {
        state.error = action.error.message;
      });
      builder
      .addCase(addReminder.pending, (state) => {
        state.loading = true;
      })
      .addCase(addReminder.fulfilled, (state, action) => {
        state.loading = false;
        state.remindArray.push(action.payload);
        state.response = "add";
      })
      .addCase(addReminder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
     
      builder.addCase(deleteReminder.fulfilled, (state, action) => {
        // Filter out the deleted reminder from the state
        state.remindArray = state.remindArray.filter(
          (item) => item._id !== action.payload
        );
      });
  
    }
  });

  // export const {
  //   addDataBack,
  //   deleteData
  // } = remindSlice.actions;

  export default remindSlice.reducer
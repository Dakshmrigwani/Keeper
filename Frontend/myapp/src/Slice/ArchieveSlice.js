import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { archieveapi , notesapi } from "../api";
import axios from "axios";

const initialState = {
  archieveArray: [],
  updateState: false,
  loading: false,
  error: "",
  response: "",
};

const fetchArchieve = createAsyncThunk("archieve/getArchieve", async (data) => {
  const response = await axios.get(`${archieveapi}/getArchieve`, data);
 

  console.log(response.data);
  return response.data;
});

// export const savedArchieve = createAsyncThunk(
//   "archieve/savedArchieve",
//   async (data) => {
//     try {
//       const response = await axios.post(`${archieveapi}/addArchieve`, data);
//       console.log(response.data);
//       return response.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );
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
    // builder
    //   .addCase(savedArchieve.pending, (state, action) => {
    //     state.loading = true;
    //   })
    //   .addCase(savedArchieve.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.archieveArray.push(action.payload);
    //     state.response = "add";
    //   })
    //   .addCase(savedArchieve.rejected , (state , action) => {
    //     state.loading = false;
    //     state.error = state.error.message;
    //   } )
  },
});
export const { addDataArchieve } = ArchieveSlice.actions;
export default ArchieveSlice.reducer;

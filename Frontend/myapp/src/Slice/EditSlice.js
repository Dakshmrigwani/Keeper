import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import { editapi } from "../api";
import axios from "axios";

const initialState = {
  EditArray: [],
  updateState: false,
  loading: false,
  error: "",
  response: "",
};

export const getAllEdit = createAsyncThunk("edit/getAllEdit" , async(data) => {
  const response = await axios.get(`${editapi}/getAllEdit` , data);
  console.log(response.data);
  return response.data;
})

export const AddEdit = createAsyncThunk("edit/AddEdit" , async(data) => {
  const response = await axios.post(`${editapi}/addEdit` , data);
  console.log(response.data);
  return response.data;
})

export const LabelSlice = createSlice({
  name: "Edit",
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
  extraReducers:(builder) => {
    builder.addCase(getAllEdit.fulfilled , (state , action) => {
      state.EditArray = action.payload;
    })
    builder.addCase(getAllEdit.rejected , (state , action) => {
      state.error = action.error.message;
    });
    builder
    .addCase(AddEdit.pending, (state) => {
      state.loading = true;
    })
    .addCase(AddEdit.fulfilled, (state, action) => {
      state.loading = false;
      state.EditArray.push(action.payload);
      state.response = "add";
    })
    .addCase(AddEdit.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
   
  }
});
// export const { addLabel , removeLabel } = LabelSlice.actions;
export default LabelSlice.reducer;

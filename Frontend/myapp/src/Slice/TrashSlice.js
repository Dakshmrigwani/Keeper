import { createSlice, nanoid } from "@reduxjs/toolkit";

const TrashArray = JSON.parse(localStorage.getItem("Trash")) || [];
const saveLocalTrash = (TrashArray) => {
  localStorage.setItem("Trash", JSON.stringify(TrashArray));
};
console.log("TrashArray", TrashArray);
const initialState = {
  TrashArray: TrashArray,
};
export const TrashSlice = createSlice({
  name: "Trash",
  initialState,
  reducers: {
    addData: (state, action) => {
      const { id, payload } = action;

      // Check if the id already exists in TrashArray
      if (!state.TrashArray.some((item) => item.id === id)) {
        // If it doesn't exist, push the new data
        state.TrashArray.push(payload);
        // Save the updated TrashArray to local storage
        saveLocalTrash(state.TrashArray);
      }
    },
    removeData: (state, action) => {
      const removedItemId = action.payload;
      state.TrashArray = state.TrashArray.filter(
        (item) => item.id !== removedItemId
      );
      saveLocalTrash(state.TrashArray);
    },
    removeAllData: (state , action)=> {
      state.TrashArray = [];
      saveLocalTrash(state.TrashArray);
    },

  },
});

export const { addData, removeData , removeAllData } = TrashSlice.actions;

export default TrashSlice.reducer;
export { TrashArray, saveLocalTrash };

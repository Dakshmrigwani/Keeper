import { createSlice, nanoid } from "@reduxjs/toolkit";

const LabelArray = JSON.parse(localStorage.getItem("Label")) || [];


const saveLocalRemind = (LabelArray) => {
  localStorage.setItem("Label", JSON.stringify(LabelArray));
};


const initialState = {
    LabelArray: LabelArray,
};
console.log(LabelArray , "LabelArray");
export const LabelSlice = createSlice({
    name: "Label",
    initialState,
    reducers: {
      addLabel: (state, action) => {
        if (action.payload.trim() !== "") {
          const label = {
            id: nanoid(),
            text: action.payload,
          };
          state.LabelArray.push(label);
          saveLocalRemind(state.LabelArray);
        }
      },
      removeLabel: (state, action)=> {
        state.LabelArray = state.LabelArray.filter((item)=> item.id !== action.payload)
        saveLocalRemind(state.LabelArray);
      }
    },
  });
export const { addLabel , removeLabel } = LabelSlice.actions;
export default LabelSlice.reducer;
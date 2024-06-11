import { Edit } from "../models/edit.models.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

export const addEdit = AsyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const NewEdit = new Edit({
      name: name,
    });
    const savedEdit = await NewEdit.save();
    res.status(200).json(savedEdit);
  } catch (error) {
    console.log("Error saving edit:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export const deleteEdit = AsyncHandler(async(req , res) => {
  try {
    const {id}= req.params
    const deleteItem = await Edit.findByIdAndDelete(id)
    if(!deleteItem){
      return res.status(404).json({message: "Edit not found" })
    }
    await deleteItem.save()
  } catch (error) {
    console.log("Error saving edit:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})

export const getAllEdit = AsyncHandler(async(req , res) => {
try {
  const AllEdit = await Edit.find()
  res.status(200).json(AllEdit);
} catch (error) {
  res.status(404).json("cannot get all edit");
}
})

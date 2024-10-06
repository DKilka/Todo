import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  id: String,
  description: String,
  complete: Boolean,
});

const TodoModel = mongoose.model("Todo", todoSchema);

export default TodoModel;

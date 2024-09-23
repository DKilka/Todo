import TodoModel from "./serverModel.js";

const getAllItems = async (req, res) => {
  let todoList;
  try {
    todoList = await TodoModel.find();
  } catch (err) {
    console.log(err);
  }
  res.send(todoList);
};

const getItem = async (req, res) => {
  const { id } = req.params;
  let foundItem;
  try {
    foundItem = await TodoModel.findById(id);
  } catch (err) {
    console.log(err);
  }
  res.send(foundItem);
};

const createItem = async (req, res) => {
  const { id, description, complete } = req.body;

  try {
    const item = new TodoModel({
      id,
      description,
      complete,
    });
    await item.save();
  } catch (err) {
    console.log(err);
  }

  res.send("TODO list was update");
};

const updateItem = async (req, res) => {
  const { id } = req.params;
  const { description, complete } = req.body;

  try {
    const updateItem = await TodoModel.findById(id);

    if (description) updateItem.description = description;
    if (complete) updateItem.complete = complete;

    await updateItem.save();
  } catch (err) {
    console.log(err);
  }

  res.send("Item was updated");
};

const deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    await TodoModel.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }

  res.send("Todo item deleted");
};

export { getAllItems, getItem, createItem, updateItem, deleteItem };

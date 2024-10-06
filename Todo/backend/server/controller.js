import TodoModel from "./model.js";

const controller = () => {
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
    const { id } = req.params.id;
    let foundItem;
    try {
      foundItem = await TodoModel.findOne({ id: id });
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
    const { description, complete } = req.body;
    const id = req.params.id;

    try {
      const updateItem = await TodoModel.findOne({ id: id });

      if (description) updateItem.description = description;
      if (typeof complete === "boolean") updateItem.complete = complete;

      await updateItem.save();
    } catch (err) {
      console.log(err);
    }

    res.send("Item was updated");
  };

  const deleteItem = async (req, res) => {
    const id = req.params.id;

    try {
      await TodoModel.findOneAndDelete({ id: id });
    } catch (err) {
      console.log(err);
    }

    res.send("Todo item deleted");
  };

  return { getAllItems, getItem, createItem, updateItem, deleteItem };
};

export default controller;

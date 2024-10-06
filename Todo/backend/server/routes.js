import express from "express";
import controller from "./controller.js";

const todoRoutes = express.Router();
const TodoController = controller();

todoRoutes.get("/", TodoController.getAllItems);
todoRoutes.get("/:id", TodoController.getItem);
todoRoutes.post("/", TodoController.createItem);
todoRoutes.patch("/:id", TodoController.updateItem);
todoRoutes.delete("/:id", TodoController.deleteItem);

export default todoRoutes;

import express from "express";
import {
  createItem,
  deleteItem,
  getAllItems,
  getItem,
  updateItem,
} from "./serverController.js";

const todoRoutes = express.Router();

todoRoutes.get("/", getAllItems);
todoRoutes.get("/:id", getItem);
todoRoutes.post("/", createItem);
todoRoutes.patch("/:id", updateItem);
todoRoutes.delete("/:id", deleteItem);

export default todoRoutes;

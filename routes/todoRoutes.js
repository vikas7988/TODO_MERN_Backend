

import express from "express";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController.js";
import {
  addTodoValidation,
  updateTodoValidation,
  validate,
} from "../validators/todoValidator.js";
import authMiddleware from "../middlewares/authMiddleware.js"; 

const router = express.Router();

router.get("/", authMiddleware, getTodos);

router.post("/", authMiddleware, addTodoValidation, validate, addTodo); 

router.put("/:id", authMiddleware, updateTodoValidation, validate, updateTodo); 

router.delete("/:id", authMiddleware, deleteTodo); 

export default router;

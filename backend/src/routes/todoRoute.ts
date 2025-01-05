import { Router } from "express";

import {
  getTodos,
  getTodoById,
  addTodo,
  updateTodo,
  completeTodo,
  deleteTodo,
} from "../controllers/todoController";

const router = Router();

router.get("/", getTodos);
router.get("/:id", getTodoById);
router.post("/", addTodo);
router.put("/:id", updateTodo);
router.put("/completed/:id", completeTodo);
router.delete("/:id", deleteTodo);

export default router;

import { Router } from "express";

import {
  getTodos,
  addTodo,
  completeTodo,
  deleteTodo,
} from "../controllers/todoController";

const router = Router();

router.get("/", getTodos);
router.post("/", addTodo);
router.put("/completed/:id", completeTodo);
router.delete("/:id", deleteTodo);

export default router;

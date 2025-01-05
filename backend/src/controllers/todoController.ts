import { Request, Response } from "express";

import {
  getTodosDB,
  addTodoDB,
  completeTodoDB,
  deleteTodoDB,
  getTodoByIdDB,
  updateTodoDB,
} from "../database/todoDB";

export const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await getTodosDB();

    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getTodoById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = Number(req.params.id);

  try {
    const result = await getTodoByIdDB(id);

    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const addTodo = async (req: Request, res: Response): Promise<void> => {
  const { title, description, projectId, priority, dueDate } = req.body;

  try {
    await addTodoDB(title, description, projectId, priority, dueDate);

    res.status(200).json({ message: "Todo created successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = Number(req.params.id);
  const { title, description, projectId, priority, dueDate } = req.body;

  try {
    await updateTodoDB(title, description, projectId, priority, dueDate, id);

    res.status(200).json({ message: "Todo updated successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const completeTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = Number(req.params.id);
  const { completed } = req.body;

  try {
    await completeTodoDB(completed, id);

    res.status(200).json({ message: "Todo completed successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = Number(req.params.id);

  try {
    await deleteTodoDB(id);

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

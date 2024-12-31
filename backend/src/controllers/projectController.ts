import { Request, Response } from "express";

import {
  getProjectsDB,
  addProjectDB,
  deleteProjectDB,
} from "../database/projectDB";

export const getProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await getProjectsDB();

    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const addProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, color } = req.body;

  try {
    await addProjectDB(name, color);

    res.status(200).json({ message: "Project created successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    await deleteProjectDB(id);

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

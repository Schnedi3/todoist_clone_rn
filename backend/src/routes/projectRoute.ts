import { Router } from "express";

import {
  addProject,
  getProjects,
  deleteProject,
} from "../controllers/projectController";

const router = Router();

router.get("/", getProjects);
router.post("/", addProject);
router.delete("/:id", deleteProject);

export default router;

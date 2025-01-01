export interface ITodos {
  title: string;
  data: ITodo[];
}

export interface ITodo {
  id: number;
  title: string;
  description: string;
  project_id: number;
  priority: number;
  completed: boolean;
  due_date: string;
  project_name: string;
  project_color: string;
}

export interface IProject {
  id: number;
  name: string;
  color: string;
}

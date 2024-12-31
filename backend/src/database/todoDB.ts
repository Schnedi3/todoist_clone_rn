import { pool } from "./db";

export const getTodosDB = async () => {
  const getTodosQuery = `
    SELECT 
    todo.due_date AS title,
    JSON_AGG(
      JSON_BUILD_OBJECT(
        'id', todo.id,
        'title', todo.title,
        'description', todo.description,
        'project_id', todo.project_id,
        'priority', todo.priority,
        'completed', todo.completed,
        'due_date', todo.due_date,
        'project_name', project.name,
        'project_color', project.color
      )
    ) AS data
    FROM todo
    JOIN project ON todo.project_id = project.id
    GROUP BY todo.due_date
    ORDER BY MIN(todo.due_date)`;

  const result = await pool.query(getTodosQuery);
  return result.rows;
};

export const addTodoDB = async (
  title: string,
  description: string,
  projectId: number,
  priority: string,
  dueDate: string
) => {
  const addTodoQuery = `
    INSERT INTO todo (title, description, project_id, priority, due_date)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`;

  await pool.query(addTodoQuery, [
    title,
    description,
    projectId,
    priority,
    dueDate,
  ]);
};

export const completeTodoDB = async (completed: boolean, id: number) => {
  const completeTodoQuery = `
    UPDATE todo
    SET completed = $1
    WHERE id = $2
    RETURNING *`;

  await pool.query(completeTodoQuery, [completed, id]);
};

export const deleteTodoDB = async (id: number): Promise<void> => {
  const deleteTodoQuery = `
    DELETE FROM todo
    WHERE id = $1
    RETURNING *`;

  await pool.query(deleteTodoQuery, [id]);
};
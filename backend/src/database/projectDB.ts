import { pool } from "./db";

export const getProjectsDB = async (): Promise<any> => {
  const getProjectsQuery = `SELECT * FROM project`;

  const result = await pool.query(getProjectsQuery);
  return result.rows;
};

export const addProjectDB = async (
  name: string,
  color: string
): Promise<any> => {
  const addProjectQuery = `
    INSERT INTO project (name, color)
    VALUES ($1, $2)
    RETURNING *`;

  await pool.query(addProjectQuery, [name, color]);
};

export const deleteProjectDB = async (id: number): Promise<void> => {
  const deleteProjectQuery = `
    DELETE FROM project
    WHERE id = $1
    RETURNING *`;

  await pool.query(deleteProjectQuery, [id]);
};

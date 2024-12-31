CREATE DATABASE todoistdb;

CREATE TABLE users (
  id VARCHAR(100) NOT NULL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50),
  email VARCHAR(50) NOT NULL
);

CREATE TABLE project (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  color VARCHAR(25) NOT NULL
);

CREATE TABLE todo (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  project_id INTEGER NOT NULL REFERENCES project(id) ON DELETE CASCADE,
  priority VARCHAR(25) NOT NULL,
  due_date DATE NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO project (name, color)
VALUES
('Study', '#e02655'),
('Work', '#7b32c9'),
('Personal', '#37c932'),
('Home', '#e3b22b');

INSERT INTO todo (title, description, project_id, priority, due_date)
VALUES
('Clone todoist app', 'Use react native', 1, 'high', '2025-01-20'),
('Go to work on train', 'Go to the station', 2, 'medium', '2025-02-08'),
('Go to the gym', 'Train for around 60min', 3, 'low', '2025-01-20'),
('Clean the house', 'Vacuum, sweep, mop', 4, 'medium', '2025-03-15');

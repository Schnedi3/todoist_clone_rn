CREATE DATABASE todoistdb;

CREATE TABLE users (
  id VARCHAR(100) NOT NULL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50),
  email VARCHAR(50) NOT NULL
);

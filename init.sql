-- init.sql

-- Create the "users" table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255)
);

-- Insert some initial data
INSERT INTO users (name, email)
VALUES ('John Doe', 'john@example.com'),
       ('Jane Smith', 'jane@example.com');

-- docker build -t my-postgres .
-- "docker run -d --name my-postgres-container -p 5432:5432 my-postgres"


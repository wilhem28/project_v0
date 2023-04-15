CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DATABASE authentication;

CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(100) NOT NULL,
    user_email VARCHAR(100) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL
);

SELECT * FROM users;

INSERT INTO users(user_name, user_email, user_password) VALUES ('Bob','bob@gmail.com','bob');
INSERT INTO users(user_name, user_email, user_password) VALUES ('Fred','fred@gmail.com','fred');

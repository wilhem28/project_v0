CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DATABASE authentication;

CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(100) NOT NULL,
    user_email VARCHAR(100) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    user_privileges BOOLEAN DEFAULT false,
    user_genre VARCHAR(20) NULL,
    user_dob DATE NOT NULL DEFAULT CURRENT_DATE,
    user_city VARCHAR(60) NULL,
    user_img VARCHAR(100) NULL
);

SELECT * FROM users;

INSERT INTO users(user_name, user_email, user_password) VALUES ('Bob','bob@gmail.com','bob');
INSERT INTO users(user_name, user_email, user_password) VALUES ('Fred','fred@gmail.com','fred');


-- SQL Schema for Sanctuary City Roleplay

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    is_online BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS divisions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    division_id INT,
    role_name VARCHAR(50) NOT NULL,
    FOREIGN KEY (division_id) REFERENCES divisions(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS staff_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    display_name VARCHAR(50),
    avatar_path VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS server_jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    job_name VARCHAR(100) NOT NULL,
    description TEXT,
    salary INT DEFAULT 0
);

-- Seed initial divisions from index.html
INSERT INTO divisions (name) VALUES ('Executive'), ('Owner'), ('Management'), ('Administration');

-- Seed roles from index.html mapping them to divisions
INSERT INTO roles (division_id, role_name) VALUES 
(1, 'Server Developer'), 
(1, 'Assistant Developer'),
(2, 'Server Owner'),
(3, 'Head Management'),
(4, 'Head Administrator'), 
(4, 'Junior Administrator');
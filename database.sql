-- Crée la table 'users'.
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    reset_token VARCHAR(255),
    reset_token_expires BIGINT,
    is_google_account BOOLEAN DEFAULT FALSE
);

-- Create the themes table
CREATE TABLE themes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Create the categories table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    theme_id INTEGER REFERENCES themes(id) ON DELETE CASCADE
);

-- Create the subjects table
CREATE TABLE subjects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Create the questions table
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    subject_id INTEGER NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    level FLOAT NOT NULL,
    statement TEXT NOT NULL,
    hint TEXT,
    question_comment TEXT,
    answer TEXT NOT NULL,
    explanation TEXT,
    answer_comment TEXT,
    answer_source TEXT,
    origin_source TEXT,
    author_id UUID REFERENCES users(id) ON DELETE SET NULL
);

-- Create the subject_categories table for many-to-many relationship between subjects and categories
CREATE TABLE subject_categories (
    subject_id INTEGER NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (subject_id, category_id)
);

-- Create the theme_categories table for many-to-many relationship between themes and categories
CREATE TABLE theme_categories (
    theme_id INTEGER NOT NULL REFERENCES themes(id) ON DELETE CASCADE,
    category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (theme_id, category_id)
);
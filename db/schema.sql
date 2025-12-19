DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    displayname TEXT NOT NULL,
    profilepicture TEXT,
    banner TEXT,
    biography TEXT,
    password TEXT NOT NULL
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    date TIMESTAMP DEFAULT now()
);
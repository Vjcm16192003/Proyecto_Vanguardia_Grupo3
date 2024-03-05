CREATE TABLE "user" (
    user_id SERIAL PRIMARY KEY,
    fullname VARCHAR(255) NOT NULL,
    weight DECIMAL(5,2) NOT NULL
    email VARCHAR(255) UNIQUE NOT NULL,
    date_of_birth DATE NOT NULL,
    password VARCHAR(255) NOT NULL,
    height DECIMAL(4,2) NOT NULL,
    gender VARCHAR(10) NOT NULL
);

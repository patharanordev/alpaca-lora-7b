CREATE TABLE IF NOT EXISTS gpt4 (
    id SERIAL PRIMARY KEY,
    instruction TEXT,
    input TEXT,
    output TEXT
);
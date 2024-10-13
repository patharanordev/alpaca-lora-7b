CREATE TABLE IF NOT EXISTS gpt4 (
    id SERIAL PRIMARY KEY,
    instruction TEXT,
    input TEXT,
    output TEXT
);

CREATE TABLE IF NOT EXISTS custom (
    id SERIAL PRIMARY KEY,
    instruction TEXT,
    input TEXT,
    output TEXT,
    link TEXT,
    ref TEXT,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
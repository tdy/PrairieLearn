CREATE TABLE IF NOT EXISTS test_access_rules (
    id SERIAL PRIMARY KEY,
    test_id INTEGER NOT NULL REFERENCES tests ON DELETE CASCADE ON UPDATE CASCADE,
    number INTEGER,
    mode enum_mode,
    role enum_role,
    uids varchar(255)[],
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    credit INTEGER,
    UNIQUE (number, test_id)
);
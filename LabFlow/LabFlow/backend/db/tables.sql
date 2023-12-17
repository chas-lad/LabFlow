CREATE TABLE users (
    id        INT IDENTITY(1,1) PRIMARY KEY,
    firstName VARCHAR(50),
    surname   VARCHAR(50),
    email     VARCHAR(50),
    userName  VARCHAR(50),
    pass      VARCHAR(72), -- max character limit that bcrypt will create hashes to
    staff     BIT DEFAULT 0
);

DELETE FROM users;
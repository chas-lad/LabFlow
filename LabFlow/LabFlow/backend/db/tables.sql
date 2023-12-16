CREATE TABLE users (
    id        INT IDENTITY(1,1) PRIMARY KEY,
    firstName VARCHAR(50),
    surname   VARCHAR(50),
    email     VARCHAR(50),
    userName  VARCHAR(50),
    pass      VARCHAR(50),
    staff     BIT DEFAULT 0
);

-- DROP TABLE users
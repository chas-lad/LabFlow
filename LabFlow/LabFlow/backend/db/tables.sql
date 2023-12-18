CREATE TABLE users (
    id        INT IDENTITY(1,1) PRIMARY KEY,
    firstName VARCHAR(50),
    surname   VARCHAR(50),
    email     VARCHAR(50),
    userName  VARCHAR(50),
    pass      VARCHAR(72), -- SHA 256 is 64 characters max
    staff     BIT DEFAULT 0
);

INSERT INTO users
(firstName, surname, email, userName, pass, staff)
VALUES
("John", "Doe", "johndoe@gmail.com", "johndoe", "$2b$1", 0),
("Jane", "Smith", "janesmith@gmail.com", "janesmith", "$2b$1", 0),
("Michael", "Johnson", "michaeljohnson@gmail.com", "michaeljohnson", "$2b$1", 0),
("Emily", "Williams", "emilywilliams@gmail.com", "emilywilliams", "$2b$1", 0),
("Daniel", "Brown", "danielbrown@gmail.com", "danielbrown", "$2b$1", 0),
("Olivia", "Jones", "oliviajones@gmail.com", "oliviajones", "$2b$1", 0),
("Matthew", "Taylor", "matthewtaylor@gmail.com", "matthewtaylor", "$2b$1", 0),
("Sophia", "Miller", "sophiamiller@gmail.com", "sophiamiller", "$2b$1", 0),
("Andrew", "Anderson", "andrewanderson@gmail.com", "andrewanderson", "$2b$1", 0),
("Emma", "Thomas", "emmathomas@gmail.com", "emmathomas", "$2b$1", 0),
("William", "Jackson", "williamjackson@gmail.com", "williamjackson", "$2b$1", 0),
("Ava", "White", "avawhite@gmail.com", "avawhite", "$2b$1", 0),
("James", "Harris", "jamesharris@gmail.com", "jamesharris", "$2b$1", 0),
("Mia", "Martin", "miamartin@gmail.com", "miamartin", "$2b$1", 0),
("Benjamin", "Clark", "benjaminclark@gmail.com", "benjaminclark", "$2b$1", 0),
("Charlotte", "Lewis", "charlottelewis@gmail.com", "charlottelewis", "$2b$1", 0),
("Joseph", "Lee", "josephlee@gmail.com", "josephlee", "$2b$1", 0),
("Chloe", "Walker", "chloewalker@gmail.com", "chloewalker", "$2b$1", 0),
("David", "Hall", "davidhall@gmail.com", "davidhall", "$2b$1", 0),
("Grace", "Young", "graceyoung@gmail.com", "graceyoung", "$2b$1", 0);

CREATE TABLE machines (
    id           INT IDENTITY(1,1) PRIMARY KEY,
    xPos         INT,
    yPos         INT,
    labID        INT FOREIGN KEY REFERENCES labs(id),
    commonIssues VARCHAR(1000),
    user_id      INT FOREIGN KEY REFERENCES users(id)
);

CREATE TABLE labs (
    id                  INT IDENTITY(1,1) PRIMARY KEY,
    locationDescription VARCHAR(1000),
    labName             VARCHAR(50),
    wheelchairAccess    BIT DEFAULT 1
);

CREATE TABLE friends (
    friend1       INT FOREIGN KEY REFERENCES users(id),
    friend2       INT FOREIGN KEY REFERENCES users(id),
    friendStatus  INT DEFAULT 0
);

CREATE TABLE teachingSchedule (
    id INT IDENTITY(1,1) PRIMARY KEY,
    module VARCHAR(10),
    lecturerName VARCHAR(50),
    dayOfWeek VARCHAR(10),
    startTime TIME,
    endTime TIME,
    labId INT FOREIGN KEY REFERENCES labs(id)
);

INSERT INTO machines
(xPos, yPos, labID, commonIssues, user_id)
VALUES
(0, 0, 1, "One monitor doesn't work, often doesn't work with logins", 1);

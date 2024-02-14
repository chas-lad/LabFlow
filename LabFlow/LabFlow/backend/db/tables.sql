-- Database schema for the lab management system.
-- Used to populate our database with mock data for demo purposes.

CREATE TABLE users (
    id        INT IDENTITY(1,1) PRIMARY KEY,
    firstName VARCHAR(50),
    surname   VARCHAR(50),
    email     VARCHAR(50),
    userName  VARCHAR(50),
    pass      VARCHAR(72), -- SHA 256 is 64 characters max (Add a couple extra for salt and pepper)
    staff     BIT DEFAULT 0,
    totalHoursSpentMon FLOAT DEFAULT 0.0,
    totalHoursSpentTue FLOAT DEFAULT 0.0,
    totalHoursSpentWed FLOAT DEFAULT 0.0,
    totalHoursSpentThu FLOAT DEFAULT 0.0,
    totalHoursSpentFri FLOAT DEFAULT 0.0,
    totalHoursSpentSat FLOAT DEFAULT 0.0,
    totalHoursSpentSun FLOAT DEFAULT 0.0
);



INSERT INTO users
(firstName, surname, email, userName, pass, staff)
VALUES
('John', 'Doe', 'johndoe@gmail.com', 'johndoe', '$2b$1', 0),
('Jane', 'Smith', 'janesmith@gmail.com', 'janesmith', '$2b$1', 0),
('Michael', 'Johnson', 'michaeljohnson@gmail.com', 'michaeljohnson', '$2b$1', 0),
('Emily', 'Williams', 'emilywilliams@gmail.com', 'emilywilliams', '$2b$1', 0),
('Daniel', 'Brown', 'danielbrown@gmail.com', 'danielbrown', '$2b$1', 0),
('Olivia', 'Jones', 'oliviajones@gmail.com', 'oliviajones', '$2b$1', 0),
('Matthew', 'Taylor', 'matthewtaylor@gmail.com', 'matthewtaylor', '$2b$1', 0),
('Sophia', 'Miller', 'sophiamiller@gmail.com', 'sophiamiller', '$2b$1', 0),
('Andrew', 'Anderson', 'andrewanderson@gmail.com', 'andrewanderson', '$2b$1', 0),
('Emma', 'Thomas', 'emmathomas@gmail.com', 'emmathomas', '$2b$1', 0),
('William', 'Jackson', 'williamjackson@gmail.com', 'williamjackson', '$2b$1', 0),
('Ava', 'White', 'avawhite@gmail.com', 'avawhite', '$2b$1', 0),
('James', 'Harris', 'jamesharris@gmail.com', 'jamesharris', '$2b$1', 0),
('Mia', 'Martin', 'miamartin@gmail.com', 'miamartin', '$2b$1', 0),
('Benjamin', 'Clark', 'benjaminclark@gmail.com', 'benjaminclark', '$2b$1', 0),
('Charlotte', 'Lewis', 'charlottelewis@gmail.com', 'charlottelewis', '$2b$1', 0),
('Joseph', 'Lee', 'josephlee@gmail.com', 'josephlee', '$2b$1', 0),
('Chloe', 'Walker', 'chloewalker@gmail.com', 'chloewalker', '$2b$1', 0),
('David', 'Hall', 'davidhall@gmail.com', 'davidhall', '$2b$1', 0),
('Grace', 'Young', 'graceyoung@gmail.com', 'graceyoung', '$2b$1', 0),
('Liam', 'Wilson', 'liamwilson@gmail.com', 'liamwilson', '$2b$1', 0),
('Sophia', 'Moore', 'sophiamoore@gmail.com', 'sophiamoore', '$2b$1', 0),
('Noah', 'Taylor', 'noahtaylor@gmail.com', 'noahtaylor', '$2b$1', 0),
('Isabella', 'Anderson', 'isabellaanderson@gmail.com', 'isabellaanderson', '$2b$1', 0),
('Oliver', 'Thomas', 'oliverthomas@gmail.com', 'oliverthomas', '$2b$1', 0),
('Amelia', 'Jackson', 'ameliajackson@gmail.com', 'ameliajackson', '$2b$1', 0),
('Elijah', 'White', 'elijahwhite@gmail.com', 'elijahwhite', '$2b$1', 0),
('Charlotte', 'Harris', 'charlotteharris@gmail.com', 'charlotteharris', '$2b$1', 0),
('William', 'Martin', 'williammartin@gmail.com', 'williammartin', '$2b$1', 0),
('Ava', 'Clark', 'avaclark@gmail.com', 'avaclark', '$2b$1', 0),
('James', 'Lewis', 'jameslewis@gmail.com', 'jameslewis', '$2b$1', 0),
('Sophia', 'Lee', 'sophialee@gmail.com', 'sophialee', '$2b$1', 0),
('Benjamin', 'Walker', 'benjaminwalker@gmail.com', 'benjaminwalker', '$2b$1', 0),
('Mia', 'Hall', 'miahall@gmail.com', 'miahall', '$2b$1', 0),
('Henry', 'Young', 'henryyoung@gmail.com', 'henryyoung', '$2b$1', 0),
('Evelyn', 'King', 'evelynking@gmail.com', 'evelynking', '$2b$1', 0),
('Alexander', 'Scott', 'alexanderscott@gmail.com', 'alexanderscott', '$2b$1', 0),
('Harper', 'Green', 'harpergreen@gmail.com', 'harpergreen', '$2b$1', 0),
('Sebastian', 'Baker', 'sebastianbaker@gmail.com', 'sebastianbaker', '$2b$1', 0),
('Avery', 'Adams', 'averyadams@gmail.com', 'averyadams', '$2b$1', 0),
('Daniel', 'Nelson', 'danielnelson@gmail.com', 'danielnelson', '$2b$1', 0),
('Scarlett', 'Hill', 'scarletthill@gmail.com', 'scarletthill', '$2b$1', 0),
('Matthew', 'Ramirez', 'mattheirez@gmail.com', 'mattheirez', '$2b$1', 0),
('Lily', 'Campbell', 'lilycampbell@gmail.com', 'lilycampbell', '$2b$1', 0),
('Jackson', 'Mitchell', 'jacksonmitchell@gmail.com', 'jacksonmitchell', '$2b$1', 0),
('Aria', 'Roberts', 'ariaroberts@gmail.com', 'ariaroberts', '$2b$1', 0),
('David', 'Carter', 'davidcarter@gmail.com', 'davidcarter', '$2b$1', 0),
('Sofia', 'Phillips', 'sofiaphillips@gmail.com', 'sofiaphillips', '$2b$1', 0),
('Joseph', 'Evans', 'josephevans@gmail.com', 'josephevans', '$2b$1', 0),
('Victoria', 'Turner', 'victoriaturner@gmail.com', 'victoriaturner', '$2b$1', 0),
('Samuel', 'Torres', 'samueltorres@gmail.com', 'samueltorres', '$2b$1', 0),
('Avery', 'Parker', 'averyparker@gmail.com', 'averyparker', '$2b$1', 0),
('Abigail', 'Collins', 'abigailcollins@gmail.com', 'abigailcollins', '$2b$1', 0),
('Henry', 'Edwards', 'henryedwards@gmail.com', 'henryedwards', '$2b$1', 0),
('Elizabeth', 'Stewart', 'elizabethstewart@gmail.com', 'elizabethstewart', '$2b$1', 0),
('Owen', 'Sanchez', 'owensanchez@gmail.com', 'owensanchez', '$2b$1', 0),
('Emily', 'Morris', 'emilymorris@gmail.com', 'emilymorris', '$2b$1', 0),
('Daniel', 'Rogers', 'danielrogers@gmail.com', 'danielrogers', '$2b$1', 0),
('Scarlett', 'Reed', 'scarlettreed@gmail.com', 'scarlettreed', '$2b$1', 0),
('Lucas', 'Cook', 'lucascook@gmail.com', 'lucascook', '$2b$1', 0),
('Chloe', 'Morgan', 'chloemorgan@gmail.com', 'chloemorgan', '$2b$1', 0),
('Grace', 'Bell', 'gracebell@gmail.com', 'gracebell', '$2b$1', 0),
('Samuel', 'Murphy', 'samuelmurphy@gmail.com', 'samuelmurphy', '$2b$1', 0),
('Avery', 'Rivera', 'averyrivera@gmail.com', 'averyrivera', '$2b$1', 0),
('Evelyn', 'Cooper', 'evelyncooper@gmail.com', 'evelyncooper', '$2b$1', 0),
('Jackson', 'Richardson', 'jacksonrichardson@gmail.com', 'jacksonrichardson', '$2b$1', 0),
('Lily', 'Cox', 'lilycox@gmail.com', 'lilycox', '$2b$1', 0),
('Benjamin', 'Ward', 'benjaminward@gmail.com', 'benjaminward', '$2b$1', 0),
('Aria', 'Peterson', 'ariapeterson@gmail.com', 'ariapeterson', '$2b$1', 0),
('Ethan', 'Robinson', 'ethanrobinson@gmail.com', 'ethanrobinson', '$2b$1', 0),
('Madison', 'Ward', 'madisonward@gmail.com', 'madisonward', '$2b$1', 0),
('Henry', 'Peterson', 'henrypeterson@gmail.com', 'henrypeterson', '$2b$1', 0),
('Ella', 'Flores', 'ellaflores@gmail.com', 'ellaflores', '$2b$1', 0),
('Samuel', 'Butler', 'samuelbutler@gmail.com', 'samuelbutler', '$2b$1', 0),
('Avery', 'Gonzalez', 'averygonzalez@gmail.com', 'averygonzalez', '$2b$1', 0),
('Victoria', 'Barnes', 'victoriabarnes@gmail.com', 'victoriabarnes', '$2b$1', 0),
('Joseph', 'Foster', 'josephfoster@gmail.com', 'josephfoster', '$2b$1', 0),
('Scarlett', 'Garcia', 'scarlettgarcia@gmail.com', 'scarlettgarcia', '$2b$1', 0),
('Daniel', 'Reed', 'danielreed@gmail.com', 'danielreed', '$2b$1', 0),
('Lily', 'Hill', 'lilyhill@gmail.com', 'lilyhill', '$2b$1', 0),
('Jackson', 'Cook', 'jacksoncook@gmail.com', 'jacksoncook', '$2b$1', 0),
('Aria', 'Morgan', 'ariamorgan@gmail.com', 'ariamorgan', '$2b$1', 0),
('David', 'Bell', 'davidbell@gmail.com', 'davidbell', '$2b$1', 0),
('Sofia', 'Murphy', 'sofiamurphy@gmail.com', 'sofiamurphy', '$2b$1', 0),
('Joseph', 'Rivera', 'josephrivera@gmail.com', 'josephrivera', '$2b$1', 0),
('Victoria', 'Cooper', 'victoriacooper@gmail.com', 'victoriacooper', '$2b$1', 0),
('Samuel', 'Richardson', 'samuelrichardson@gmail.com', 'samuelrichardson', '$2b$1', 0),
('Avery', 'Cox', 'averycox@gmail.com', 'averycox', '$2b$1', 0),
('Abigail', 'Ward', 'abigailward@gmail.com', 'abigailward', '$2b$1', 0),
('Henry', 'Peterson', 'henrypeterson@gmail.com', 'henrypeterson', '$2b$1', 0),
('Elizabeth', 'Flores', 'elizabethflores@gmail.com', 'elizabethflores', '$2b$1', 0),
('Owen', 'Butler', 'owenbutler@gmail.com', 'owenbutler', '$2b$1', 0),
('Emily', 'Gonzalez', 'emilygonzalez@gmail.com', 'emilygonzalez', '$2b$1', 0),
('Daniel', 'Barnes', 'danielbarnes@gmail.com', 'danielbarnes', '$2b$1', 0),
('Scarlett', 'Foster', 'scarlettfoster@gmail.com', 'scarlettfoster', '$2b$1', 0),
('Lucas', 'Garcia', 'lucasgarcia@gmail.com', 'lucasgarcia', '$2b$1', 0),
('Chloe', 'Reed', 'chloereed@gmail.com', 'chloereed', '$2b$1', 0),
('Grace', 'Hill', 'gracehill@gmail.com', 'gracehill', '$2b$1', 0),
('Samuel', 'Cook', 'samuelcook@gmail.com', 'samuelcook', '$2b$1', 0),
('Avery', 'Morgan', 'averymorgan@gmail.com', 'averymorgan', '$2b$1', 0),
('Evelyn', 'Bell', 'evelynbell@gmail.com', 'evelynbell', '$2b$1', 0),
('Jackson', 'Murphy', 'jacksonmurphy@gmail.com', 'jacksonmurphy', '$2b$1', 0),
('Lily', 'Rivera', 'lilyrivera@gmail.com', 'lilyrivera', '$2b$1', 0),
('Benjamin', 'Cooper', 'benjamincooper@gmail.com', 'benjamincooper', '$2b$1', 0),
('Aria', 'Richardson', 'ariarichardson@gmail.com', 'ariarichardson', '$2b$1', 0),
('Lucas', 'Cox', 'lucascox@gmail.com', 'lucascox', '$2b$1', 0),
('Chloe', 'Ward', 'chloeward@gmail.com', 'chloeward', '$2b$1', 0),
('Grace', 'Peterson', 'gracepeterson@gmail.com', 'gracepeterson', '$2b$1', 0),
('Samuel', 'Flores', 'samuelflores@gmail.com', 'samuelflores', '$2b$1', 0),
('Avery', 'Butler', 'averybutler@gmail.com', 'averybutler', '$2b$1', 0),
('Evelyn', 'Gonzalez', 'evelyngonzalez@gmail.com', 'evelyngonzalez', '$2b$1', 0),
('Jackson', 'Barnes', 'jacksonbarnes@gmail.com', 'jacksonbarnes', '$2b$1', 0),
('Lily', 'Foster', 'lilyfoster@gmail.com', 'lilyfoster', '$2b$1', 0),
('Benjamin', 'Garcia', 'benjamingarcia@gmail.com', 'benjamingarcia', '$2b$1', 0),
('Aria', 'Reed', 'ariareed@gmail.com', 'ariareed', '$2b$1', 0),
('Lucas', 'Hill', 'lucashill@gmail.com', 'lucashill', '$2b$1', 0),
('Chloe', 'Cook', 'chloecook@gmail.com', 'chloecook', '$2b$1', 0),
('Grace', 'Morgan', 'gracemorgan@gmail.com', 'gracemorgan', '$2b$1', 0),
('Samuel', 'Bell', 'samuelbell@gmail.com', 'samuelbell', '$2b$1', 0),
('Avery', 'Murphy', 'averymurphy@gmail.com', 'averymurphy', '$2b$1', 0),
('Evelyn', 'Rivera', 'evelynrivera@gmail.com', 'evelynrivera', '$2b$1', 0),
('Jackson', 'Cooper', 'jacksoncooper@gmail.com', 'jacksoncooper', '$2b$1', 0),
('Lily', 'Richardson', 'lilyrichardson@gmail.com', 'lilyrichardson', '$2b$1', 0);

CREATE TABLE labs (
    id                  INT,
    locationDescription VARCHAR(1000),
    labName             VARCHAR(50),
    wheelchairAccess    BIT DEFAULT 1,
    latitude            FLOAT,
    longitude           FLOAT,
    PRIMARY KEY (id)
);


INSERT INTO labs
(id, locationDescription, labName, wheelchairAccess, latitude, longitude)
VALUES
(1, 'William Henry Bragg Building: 2nd floor, room 2.05', '2.05', 1, 53.80918723181025, -1.5538067297490388),
(2, 'William Henry Bragg Building: 2nd floor, room 2.06', '2.06', 1, 53.80918723181025, -1.5538067297490388),
(3, 'EC Stoner Building: 2nd floor, room 2.07', '2.07', 1, 53.80550975403996, -1.5520769739259042);


CREATE TABLE machines (
    machineID       INT,
    xPos            FLOAT,
    yPos            FLOAT,
    labID           INT FOREIGN KEY REFERENCES labs(id),
    commonIssues    VARCHAR(1000),
    userID          INT FOREIGN KEY REFERENCES users(id),
    VRHeadset       BIT,
    CPU             VARCHAR(50),
    RAM             VARCHAR(50),
    GPU             VARCHAR(50),
    PRIMARY KEY (machineID, labID)
);

-- Insert records for lab 2.05 machines (labID = 1)
INSERT INTO machines
(machineID, xPos, yPos, labID, commonIssues, userID, VRHeadset, CPU, RAM, GPU)
VALUES
-- Row 1 Col 1
(1, 0.0, 0.0, 1, NULL, NULL, 0, 'Intel Core i7 14700kf', '16GB', 'RTX 4060'),
(2, 1.0, 0.0, 1, 'Software crashes occasionally', NULL, 1, 'Intel Core i5 13600kf', '16GB', 'RTX 3050'),
(3, 2.0, 0.0, 1, 'Printer connectivity issues', NULL, 0, 'Intel Core i9 14900kf', '32GB', 'RTX 3050'),
(4, 3.0, 0.0, 1, NULL, NULL, 0, 'Intel Core i7 14700kf', '8GB', 'RTX 4060'),
(5, 4.0, 0.0, 1, NULL, NULL, 0, 'Intel Core i7 14700kf', '16GB', 'RTX 4090'),
-- Row 1 Col 2
(6, 6.0, 0.0, 1, 'USB ports occasionally stop working', NULL, 0, 'Intel Core i9 14900kf', '32GB', 'RTX 3050'),
(7, 7.0, 0.0, 1, NULL, NULL, 0, 'Intel Core i7 14700kf', '16GB', 'RTX 4060'),
(8, 8.0, 0.0, 1, 'Minor keyboard lag', NULL, 0, 'Intel Core i7 14700kf', '8GB', 'RTX 4090'),
(9, 9.0, 0.0, 1, 'Intermittent network connectivity issues', NULL, 1, 'Intel Core i7 14700kf', '16GB', 'RTX 4060'),
(10, 10.0, 0.0, 1, NULL, NULL, 0, 'Intel Core i9 14900kf', '8GB', 'RTX 3050'),
-- Row 2 Col 1
(11, 0.0, 1.0, 1, 'Occasional software update errors', NULL, 0, 'Intel Core i5 13600kf', '16GB', 'RTX 4060'),
(12, 1.0, 1.0, 1, NULL, NULL, 0, 'Intel Core i7 14700kf', '8GB', 'RTX 4060'),
(13, 2.0, 1.0, 1, 'Bluetooth connectivity issues', NULL, 0, 'Intel Core i5 13600kf', '8GB', 'RTX 4060'),
(14, 3.0, 1.0, 1, 'Minor overheating', NULL, 0, 'Intel Core i5 13600kf', '8GB', 'RTX 4090'),
(15, 4.0, 1.0, 1, 'Occasional screen flickering', NULL, 0, 'Intel Core i7 14700kf', '16GB', 'RTX 4060'),
-- Row 2 Col 2
(16, 6.0, 1.0, 1, 'USB devices occasionally not recognized', NULL, 0, 'Intel Core i9 14900kf', '32GB', 'RTX 3050'),
(17, 7.0, 1.0, 1, NULL, NULL, 0, 'Intel Core i7 14700kf', '16GB', 'RTX 4090'),
(18, 8.0, 1.0, 1, 'Occasional system freezes', NULL, 0, 'Intel Core i9 14900kf', '32GB', 'RTX 3050'),
(19, 9.0, 1.0, 1, 'Minor audio crackling', NULL, 0, 'Intel Core i9 14900kf', '32GB', 'RTX 3050'),
(20, 10.0, 1.0, 1, NULL, NULL, 0, 'Intel Core i7 14700kf', '16GB', 'RTX 4060'),
-- Row 3 Col 1
(21, 0.0, 2.0, 1, NULL, NULL, 0, 'Intel Core i7 14700kf', '8GB', 'RTX 3050'),
(22, 1.0, 2.0, 1, 'Occasional software crashes', NULL, 1, 'Intel Core i7 14700kf', '8GB', 'RTX 4090'),
(23, 2.0, 2.0, 1, NULL, NULL, 0, 'Intel Core i9 14900kf', '16GB', 'RTX 3050'),
(24, 3.0, 2.0, 1, 'Intermittent network disconnections', NULL, 0, 'Intel Core i5 13600kf', '8GB', 'RTX 4060'),
(25, 4.0, 2.0, 1, NULL, NULL, 0, 'Intel Core i5 13600kf', '32GB', 'RTX 4090'),
-- Row 3 Col 2
(26, 7.0, 2.0, 1, 'Occasional software installation errors', NULL, 0, 'Intel Core i5 13600kf', '32GB', 'RTX 4090'),
(27, 8.0, 2.0, 1, 'Minor battery charging issues', NULL, 0, 'Intel Core i7 14700kf', '16GB', 'RTX 4060'),
(28, 9.0, 2.0, 1, NULL, NULL, 0, 'Intel Core i9 14900kf', '16GB', 'RTX 3050'),
(29, 10.0, 2.0, 1, NULL, NULL, 0, 'Intel Core i7 14700kf', '16GB', 'RTX 3050'),
-- Row 4 Col 1
(30, 0.0, 3.0, 1, 'Occasional screen flickering during startup', NULL, 0, 'Intel Core i7 14700kf', '16GB', 'RTX 3050'),
(31, 1.0, 3.0, 1, 'USB devices intermittently disconnect', NULL, 0, 'Intel Core i9 14900kf', '32GB', 'RTX 4090'),
(32, 2.0, 3.0, 1, NULL, NULL, 0, 'Intel Core i7 14700kf', '16GB', 'RTX 3050'),
(33, 3.0, 3.0, 1, NULL, NULL, 0, 'Intel Core i9 14900kf', '32GB', 'RTX 4090'),
-- Row 4 Col 2
(34, 6.0, 3.0, 1, 'Minor audio distortion', NULL, 0, 'Intel Core i5 13600kf', '16GB', 'RTX 3050'),
(35, 7.0, 3.0, 1, 'Intermittent display flickering during video playback', NULL, 0, 'Intel Core i5 13600kf', '32GB', 'RTX 3050'),
(36, 8.0, 3.0, 1, NULL, NULL, 0, 'Intel Core i9 14900kf', '16GB', 'RTX 3050'),
(37, 9.0, 3.0, 1, 'Occasional software freezes', NULL, 1, 'Intel Core i7 14700kf', '32GB', 'RTX 4060'),
(38, 10.0, 3.0, 1, 'Minor keyboard key sticking', NULL, 1, 'Intel Core i7 14700kf', '16GB', 'RTX 3050'),
-- Row 5 Col 1
(39, 0.0, 4.0, 1, 'Minor audio crackling', NULL, 0, 'Intel Core i7 14700kf', '8GB', 'RTX 3050'),
(40, 1.0, 4.0, 1, 'Intermittent network disconnections', NULL, 1, 'Intel Core i7 14700kf', '16GB', 'RTX 3050'),
(41, 2.0, 4.0, 1, NULL, NULL, 0, 'Intel Core i9 14900kf', '32GB', 'RTX 3050'),
(42, 3.0, 4.0, 1, 'Minor battery charging issues', NULL, 1, 'Intel Core i5 13600kf', '8GB', 'RTX 4060'),
(43, 4.0, 4.0, 1, NULL, NULL, 0, 'Intel Core i5 13600kf', '32GB', 'RTX 4090'),
-- Row 5 Col 2
(44, 6.0, 4.0, 1, 'Occasional software installation errors', NULL, 0, 'Intel Core i5 13600kf', '32GB', 'RTX 4090'),
(45, 7.0, 4.0, 1, 'Minor battery charging issues', NULL, 1, 'Intel Core i7 14700kf', '16GB', 'RTX 4060'),
(46, 8.0, 4.0, 1, NULL, NULL, 0, 'Intel Core i9 14900kf', '16GB', 'RTX 3050'),
(47, 9.0, 4.0, 1, NULL, NULL, 0, 'Intel Core i7 14700kf', '16GB', 'RTX 3050'),
-- Row 6 Col 1
(48, 0.0, 5.0, 1, 'Occasional screen flickering during startup', NULL, 0, 'Intel Core i7 14700kf', '16GB', 'RTX 3050'),
(49, 1.0, 5.0, 1, 'USB devices intermittently disconnect', NULL, 1, 'Intel Core i9 14900kf', '32GB', 'RTX 4090'),
(50, 2.0, 5.0, 1, NULL, NULL, 0, 'Intel Core i7 14700kf', '16GB', 'RTX 3050'),
(51, 3.0, 5.0, 1, NULL, NULL, 0, 'Intel Core i9 14900kf', '32GB', 'RTX 4090'),
-- Row 6 Col 2
(52, 6.0, 5.0, 1, 'Minor audio distortion', NULL, 0, 'Intel Core i5 13600kf', '16GB', 'RTX 3050'),
(53, 7.0, 5.0, 1, 'Intermittent display flickering during video playback', NULL, 0, 'Intel Core i5 13600kf', '32GB', 'RTX 3050'),
(54, 8.0, 5.0, 1, NULL, NULL, 0, 'Intel Core i9 14900kf', '16GB', 'RTX 3050'),
(55, 9.0, 5.0, 1, 'Occasional software freezes', NULL, 0, 'Intel Core i7 14700kf', '32GB', 'RTX 4060'),
(56, 10.0, 5.0, 1, 'Minor keyboard key sticking', NULL, 0, 'Intel Core i7 14700kf', '16GB', 'RTX 3050'),
-- Row 7 Col 1
(57, 0.0, 6.0, 1, 'Minor audio crackling', NULL, 0, 'Intel Core i7 14700kf', '8GB', 'RTX 3050'),
(58, 1.0, 6.0, 1, 'Intermittent network disconnections', NULL, 0, 'Intel Core i7 14700kf', '16GB', 'RTX 3050'),
(59, 2.0, 6.0, 1, NULL, NULL, 0, 'Intel Core i9 14900kf', '32GB', 'RTX 3050'),
(60, 3.0, 6.0, 1, 'Minor battery charging issues', NULL, 0, 'Intel Core i5 13600kf', '8GB', 'RTX 4060'),
(61, 4.0, 6.0, 1, NULL, NULL, 0, 'Intel Core i5 13600kf', '32GB', 'RTX 4090'),
-- Row 7 Col 2
(62, 6.0, 6.0, 1, 'Occasional software installation errors', NULL, 0, 'Intel Core i5 13600kf', '32GB', 'RTX 4090'),
(63, 7.0, 6.0, 1, 'Minor battery charging issues', NULL, 0, 'Intel Core i7 14700kf', '16GB', 'RTX 4060'),
(64, 8.0, 6.0, 1, NULL, NULL, 0, 'Intel Core i9 14900kf', '16GB', 'RTX 3050'),
(65, 9.0, 6.0, 1, NULL, NULL, 0, 'Intel Core i7 14700kf', '16GB', 'RTX 3050'),
-- Row 8 Col 1
(66, 0.0, 7.0, 1, 'Occasional screen flickering during startup', NULL, 0, 'Intel Core i7 14700kf', '16GB', 'RTX 3050'),
(67, 1.0, 7.0, 1, 'USB devices intermittently disconnect', NULL, 0, 'Intel Core i9 14900kf', '32GB', 'RTX 4090'),
(68, 2.0, 7.0, 1, NULL, NULL, 0, 'Intel Core i7 14700kf', '16GB', 'RTX 3050'),
(69, 3.0, 7.0, 1, NULL, NULL, 0, 'Intel Core i9 14900kf', '32GB', 'RTX 4090'),
-- Row 8 Col 2
(70, 6.0, 7.0, 1, 'Minor audio distortion', NULL, 0, 'Intel Core i5 13600kf', '16GB', 'RTX 3050'),
(71, 7.0, 7.0, 1, 'Intermittent display flickering during video playback', NULL, 0, 'Intel Core i5 13600kf', '32GB', 'RTX 3050'),
(72, 8.0, 7.0, 1, NULL, NULL, 0, 'Intel Core i9 14900kf', '16GB', 'RTX 3050'),
(73, 9.0, 7.0, 1, 'Occasional software freezes', NULL, 0, 'Intel Core i7 14700kf', '32GB', 'RTX 4060'),
(74, 10.0, 7.0, 1, 'Minor keyboard key sticking', NULL, 0, 'Intel Core i7 14700kf', '16GB', 'RTX 3050'),
-- Row 9 Col 1
(75, 0.0, 8.0, 1, 'Minor audio crackling', NULL, 0, 'Intel Core i7 14700kf', '8GB', 'RTX 3050'),
(76, 1.0, 8.0, 1, 'Intermittent network disconnections', NULL, 0, 'Intel Core i7 14700kf', '16GB', 'RTX 3050'),
(77, 2.0, 8.0, 1, NULL, NULL, 0, 'Intel Core i9 14900kf', '32GB', 'RTX 3050'),
(78, 3.0, 8.0, 1, 'Minor battery charging issues', NULL, 1, 'Intel Core i5 13600kf', '8GB', 'RTX 4060'),
(79, 4.0, 8.0, 1, NULL, NULL, 0, 'Intel Core i5 13600kf', '32GB', 'RTX 4090'),
-- Row 9 Col 2
(80, 6.0, 8.0, 1, 'Occasional software installation errors', NULL, 0, 'Intel Core i5 13600kf', '32GB', 'RTX 4090'),
(81, 7.0, 8.0, 1, 'Minor battery charging issues', NULL, 0, 'Intel Core i7 14700kf', '16GB', 'RTX 4060'),
(82, 8.0, 8.0, 1, NULL, NULL, 0, 'Intel Core i9 14900kf', '16GB', 'RTX 3050'),
(83, 9.0, 8.0, 1, NULL, NULL, 0, 'Intel Core i7 14700kf', '16GB', 'RTX 3050');

-- Insert records for lab 2.06 machines (labID = 2)
INSERT INTO machines
(machineID, xPos, yPos, labID, commonIssues, userID, VRHeadset, CPU, RAM, GPU) 
VALUES
-- Row 1
(1, 0.0, 0.0, 2, 'Minor display flickering', NULL, 0, 'Intel Core i7 10700kf', '16GB', 'RTX 3050'),
(2, 1.0, 0.0, 2, NULL, NULL, 0, 'Intel Core i5 13600kf', '16GB', 'RTX 4060'),
(3, 2.0, 0.0, 2, 'Occasional system slowdowns', NULL, 0, 'Intel Core i5 13600kf', '8GB', 'RTX 3050'),
(4, 3.0, 0.0, 2, NULL, NULL, 0, 'Intel Core i7 10700kf', '16GB', 'RTX 4060'),
(5, 4.0, 0.0, 2, NULL, NULL, 0, 'Intel Core i5 13600kf', '16GB', 'RTX 3050'),
-- Row 2
(6, 0.0, 1.0, 2, NULL, NULL, 0, 'Intel Core i7 10700kf', '16GB', 'RTX 4060'),
(7, 1.0, 1.0, 2, NULL, NULL, 0, 'Intel Core i5 13600kf', '32GB', 'RTX 3050'),
(8, 2.0, 1.0, 2, 'Intermittent display brightness fluctuations', NULL, 0, 'Intel Core i7 10700kf', '16GB', 'RTX 3050'),
(9, 3.0, 1.0, 2, NULL, NULL, 0, 'Intel Core i5 13600kf', '32GB', 'RTX 4060'),
(10, 4.0, 1.0, 2, NULL, NULL, 0, 'Intel Core i7 10700kf', '16GB', 'RTX 3050'),
-- Row 3
(11, 0.0, 2.0, 2, 'Bluetooth pairing problems', NULL, 1, 'Intel Core i5 13600kf', '16GB', 'RTX 4060'),
(12, 1.0, 2.0, 2, NULL, NULL, 0, 'Intel Core i5 13600kf', '8GB', 'RTX 3050'),
(13, 2.0, 2.0, 2, 'Minor mouse cursor jumping', NULL, 1, 'Intel Core i7 10700kf', '32GB', 'RTX 3050'),
(14, 3.0, 2.0, 2, NULL, NULL, 0, 'Intel Core i5 13600kf', '16GB', 'RTX 4060'),
(15, 4.0, 2.0, 2, NULL, NULL, 0, 'Intel Core i5 13600kf', '32GB', 'RTX 3050'),
-- Row 4
(16, 0.0, 3.0, 2, NULL, NULL, 0, 'Intel Core i5 13600kf', '16GB', 'RTX 4090'),
(17, 1.0, 3.0, 2, NULL, NULL, 1, 'Intel Core i5 13600kf', '16GB', 'RTX 4090'),
(18, 2.0, 3.0, 2, NULL, NULL, 0, 'Intel Core i7 10700kf', '32GB', 'RTX 4090'),
(19, 3.0, 3.0, 2, NULL, NULL, 1, 'Intel Core i5 13600kf', '16GB', 'RTX 4090'),
(20, 4.0, 3.0, 2, NULL, NULL, 0, 'Intel Core i5 13600kf', '32GB', 'RTX 4090'),
-- Row 5
(21, 0.0, 4.0, 2, 'Minor audio distortion', NULL, 0, 'Intel Core i5 13600kf', '8GB', 'RTX 3050'),
(22, 1.0, 4.0, 2, NULL, NULL, 0, 'Intel Core i5 13600kf', '16GB', 'RTX 3050'),
(23, 2.0, 4.0, 2, NULL, NULL, 0, 'Intel Core i7 10700kf', '32GB', 'RTX 4090'),
(24, 3.0, 4.0, 2, NULL, NULL, 0, 'Intel Core i5 13600kf', '16GB', 'RTX 4090'),
(25, 4.0, 4.0, 2, NULL, NULL, 0, 'Intel Core i5 13600kf', '16GB', 'RTX 3050'),
-- Column along side
(26, 6.0, 0.5, 2, NULL, NULL, 0, 'Intel Core i5 13600kf', '32GB', 'RTX 4060'),
(27, 6.0, 1.5, 2, NULL, NULL, 1, 'Intel Core i7 10700kf', '32GB', 'RTX 4090'),
(28, 6.0, 2.5, 2, NULL, NULL, 1, 'Intel Core i5 13600kf', '32GB', 'RTX 4090'),
(29, 6.0, 3.5, 2, NULL, NULL, 0, 'Intel Core i7 10700kf', '32GB', 'RTX 3050');

-- Insert records for lab 2.07 machines (labID = 3)
INSERT INTO machines
(machineID, xPos, yPos, labID, commonIssues, userID, VRHeadset, CPU, RAM, GPU)
VALUES
-- Row 1 Col 1
(1, 0.0, 0.0, 3, 'Minor display flickering', NULL, 0, 'Intel Core i7 10700kf', '16GB', 'RTX 3050'),
(2, 1.0, 0.0, 3, NULL, NULL, 0, 'Intel Core i7 10700kf', '32GB', 'RTX 3050'),
(3, 2.0, 0.0, 3, 'Occasional system slowdowns', NULL, 0, 'Intel Core i7 10700kf', '16GB', 'RTX 3050'),
(4, 3.0, 0.0, 3, NULL, NULL, 0, 'Intel Core i7 10700kf', '32GB', 'RTX 4090'),
(5, 4.0, 0.0, 3, NULL, NULL, 0, 'Intel Core i7 10700kf', '16GB', 'RTX 3050'),
-- Row 1 Col 2
(6, 6.0, 0.0, 3, NULL, NULL, 0, 'Intel Core i7 10700kf', '16GB', 'RTX 4090'),
(7, 7.0, 0.0, 3, NULL, NULL, 0, 'Intel Core i7 10700kf', '16GB', 'RTX 3050'),
(8, 8.0, 0.0, 3, 'Intermittent display brightness fluctuations', NULL, 0, 'Intel Core i7 10700kf', '32GB', 'RTX 4090'),
(9, 9.0, 0.0, 3, NULL, NULL, 0, 'Intel Core i7 10700kf', '16GB', 'RTX 4090'),
(10, 10.0, 0.0, 3, NULL, NULL, 0, 'Intel Core i7 10700kf', '16GB', 'RTX 3050'),
-- Row 2 Col 1
(11, 0.0, 1.0, 3, 'Bluetooth pairing problems', NULL, 0, 'Intel Core i7 10700kf', '16GB', 'RTX 4090'),
(12, 1.0, 1.0, 3, NULL, NULL, 0, 'Intel Core i7 10700kf', '32GB', 'RTX 4090'),
(13, 2.0, 1.0, 3, 'Minor mouse cursor jumping', NULL, 0, 'Intel Core i7 10700kf', '16GB', 'RTX 4090'),
(14, 3.0, 1.0, 3, NULL, NULL, 0, 'Intel Core i7 10700kf', '32GB', 'RTX 4090'),
(15, 4.0, 1.0, 3, NULL, NULL, 0, 'Intel Core i7 10700kf', '16GB', 'RTX 4090'),
-- Row 2 Col 2
(16, 6.0, 1.0, 3, NULL, NULL, 0, 'Intel Core i7 10700kf', '32GB', 'RTX 4090'),
(17, 7.0, 1.0, 3, NULL, NULL, 0, 'Intel Core i7 10700kf', '16GB', 'RTX 4090'),
(18, 8.0, 1.0, 3, NULL, NULL, 0, 'Intel Core i7 10700kf', '16GB', 'RTX 4090'),
(19, 9.0, 1.0, 3, NULL, NULL, 0, 'Intel Core i7 10700kf', '32GB', 'RTX 4090'),
(20, 10.0, 1.0, 3, NULL, NULL, 0, 'Intel Core i7 10700kf', '32GB', 'RTX 4090'),
-- Row 3 Col 1
(21, 0.0, 2.0, 3, 'Minor audio distortion', NULL, 0, 'Intel Core i7 10700kf', '16GB', 'RTX 3050'),
(22, 1.0, 2.0, 3, NULL, NULL, 0, 'Intel Core i7 10700kf', '32GB', 'RTX 4090'),
(23, 2.0, 2.0, 3, NULL, NULL, 0, 'Intel Core i7 10700kf', '16GB', 'RTX 4090'),
(24, 3.0, 2.0, 3, NULL, NULL, 0, 'Intel Core i7 10700kf', '16GB', 'RTX 4090'),
(25, 4.0, 2.0, 3, NULL, NULL, 0, 'Intel Core i7 10700kf', '32GB', 'RTX 4090'),
-- Row 3 Col 2
(26, 6.0, 2.0, 3, NULL, NULL, 0, 'Intel Core i7 10700kf', '16GB', 'RTX 4090'),
(27, 7.0, 2.0, 3, NULL, NULL, 0, 'Intel Core i7 10700kf', '16GB', 'RTX 4090'),
(28, 8.0, 2.0, 3, NULL, NULL, 0, 'Intel Core i7 10700kf', '16GB', 'RTX 4090'),
(29, 9.0, 2.0, 3, NULL, NULL, 0, 'Intel Core i7 10700kf', '32GB', 'RTX 4090'),
(30, 10.0, 2.0, 3, NULL, NULL, 0, 'Intel Core i7 10700kf', '32GB', 'RTX 4090'),
-- Row 4 Col 1
(31, 0.0, 3.0, 3, NULL, NULL, 0, 'Intel Core i7 10700kf', '16GB', 'RTX 3050'),
(32, 1.0, 3.0, 3, NULL, NULL, 0, 'Intel Core i7 10700kf', '32GB', 'RTX 4090'),
(33, 2.0, 3.0, 3, NULL, NULL, 0, 'Intel Core i7 10700kf', '16GB', 'RTX 3050'),
(34, 3.0, 3.0, 3, NULL, NULL, 0, 'Intel Core i7 10700kf', '32GB', 'RTX 4090'),
-- Row 4 Col 2
(35, 6.0, 3.0, 3, NULL, NULL, 0, 'Intel Core i7 10700kf', '16GB', 'RTX 4090'),
(36, 7.0, 3.0, 3, NULL, NULL, 0, 'Intel Core i7 10700kf', '16GB', 'RTX 4090'),
(37, 8.0, 3.0, 3, NULL, NULL, 0, 'Intel Core i7 10700kf', '16GB', 'RTX 4090'),
(38, 9.0, 3.0, 3, NULL, NULL, 0, 'Intel Core i7 10700kf', '32GB', 'RTX 4090'),
(39, 10.0, 3.0, 3, NULL, NULL, 0, 'Intel Core i7 10700kf', '32GB', 'RTX 4090');


CREATE TABLE friends (
    friend1       INT FOREIGN KEY REFERENCES users(id),
    friend2       INT FOREIGN KEY REFERENCES users(id)
    PRIMARY KEY (friend1, friend2)
);


CREATE TABLE teachingSchedule (
    id INT IDENTITY(1,1) PRIMARY KEY,
    module VARCHAR(100),
    lecturerName VARCHAR(50),
    dayOfWeek VARCHAR(10),
    startTime DATETIME,
    endTime DATETIME,
    labId INT FOREIGN KEY REFERENCES labs(id)
);

INSERT INTO teachingSchedule
(module, lecturerName, dayOfWeek, startTime, endTime, labId)
VALUES
(
    'COMP3811: Computer Graphics',
    'Markus Belitter',
    'Mon',
    '09:00:00',
    '11:00:00',
    1
),
(
    'COMP3911: Secure Computing',
    'Arshad Jumka',
    'Mon',
    '13:00:00',
    '15:00:00',
    1
),
(
    'COMP2211: Operating Systems',
    'Samuel Wilson',
    'Mon',
    '15:00:00',
    '17:00:00',
    2
),
(
    'COMP3211: Distributed Systems',
    'Karim Djemame',
    'Tue',
    '10:00:00',
    '12:00:00',
    1
),
(
    'COMP2811: User Interfaces',
    'Tom Kelly',
    'Tue',
    '13:00:00',
    '15:00:00',
    3
),
(
    'COMP3736: Information Visualisation',
    'Roy Ruddle',
    'Wed',
    '09:00:00',
    '11:00:00',
    2
),
(
    'COMP2611: Artifical Intelligence',
    'Andy Bulpitt',
    'Wed',
    '11:00:00',
    '13:00:00',
    3
),
(
    'COMP2421: Numerical Computation',
    'Thomas Ranner',
    'Thu',
    '11:00:00',
    '13:00:00',
    3
),
(
    'COMP3771: User Adaptive Intelligent Systems',
    'Vania Dimitrova',
    'Thu',
    '14:00:00',
    '16:00:00',
    2
),
(
    'COMP3811: Computer Graphics',
    'Markus Belitter',
    'Fri',
    '10:00:00',
    '12:00:00',
    3
);

-- Note both machineID and labID are primary keys in the machines table
CREATE TABLE tickets (
    ticketID INT IDENTITY(1,1) PRIMARY KEY,
    machineID INT,
    labID INT,
    userID INT FOREIGN KEY REFERENCES users(id),
    issueDescription VARCHAR(1000),
    issueStatus BIT,
    dateCreated DATETIME,
    dateResolved DATETIME NULL,
    FOREIGN KEY (machineID, labID) REFERENCES machines(machineID, labID)
);

DROP TABLE tickets

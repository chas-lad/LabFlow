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
('Matthew', 'Ramirez', 'matthewramirez@gmail.com', 'matthewramirez', '$2b$1', 0),
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
('Aria', 'Peterson', 'ariapeterson@gmail.com', 'ariapeterson', '$2b$1', 0);


CREATE TABLE labs (
    id                  INT,
    locationDescription VARCHAR(1000),
    labName             VARCHAR(50),
    wheelchairAccess    BIT DEFAULT 1
    PRIMARY KEY (id)
);

INSERT INTO labs
(id, locationDescription, labName, wheelchairAccess)
VALUES
(1, '2nd floor, room 2.05', '2.05', 1),
(2, '2nd floor, room 2.06', '2.06', 1),
(3, '2nd floor, room 2.07', '2.07', 1);


CREATE TABLE machines (
    machineID       INT,
    xPos            FLOAT,
    yPos            FLOAT,
    labID           INT FOREIGN KEY REFERENCES labs(id),
    commonIssues    VARCHAR(1000),
    userID          INT FOREIGN KEY REFERENCES users(id)
    PRIMARY KEY (machineID, labID)
);

-- Insert records for lab 2.05 machines (labID = 1)
INSERT INTO machines
(machineID, xPos, yPos, labID, commonIssues, userID)
VALUES
-- Row 1 Col 1
(1, 0.0, 0.0, 1, NULL, NULL),
(2, 1.0, 0.0, 1, 'Software crashes occasionally', NULL),
(3, 2.0, 0.0, 1, 'Printer connectivity issues', NULL),
(4, 3.0, 0.0, 1, NULL, NULL),
(5, 4.0, 0.0, 1, NULL, NULL),
-- Row 1 Col 2
(6, 6.0, 0.0, 1, 'USB ports occasionally stop working', NULL),
(7, 7.0, 0.0, 1, NULL, NULL),
(8, 8.0, 0.0, 1, 'Minor keyboard lag', NULL),
(9, 9.0, 0.0, 1, 'Intermittent network connectivity issues', NULL),
(10, 10.0, 0.0, 1, NULL, NULL),
-- Row 2 Col 1
(11, 0.0, 1.0, 1, 'Occasional software update errors', NULL),
(12, 1.0, 1.0, 1, NULL, NULL),
(13, 2.0, 1.0, 1, 'Bluetooth connectivity issues', NULL),
(14, 3.0, 1.0, 1, 'Minor overheating', NULL),
(15, 4.0, 1.0, 1, 'Occasional screen flickering', NULL),
-- Row 2 Col 2
(16, 6.0, 1.0, 1, 'USB devices occasionally not recognized', NULL),
(17, 7.0, 1.0, 1, NULL, NULL),
(18, 8.0, 1.0, 1, 'Occasional system freezes', NULL),
(19, 9.0, 1.0, 1, 'Minor audio crackling', NULL),
(20, 10.0, 1.0, 1, NULL, NULL),
-- Row 3 Col 1
(21, 0.0, 2.0, 1, NULL, NULL),
(22, 1.0, 2.0, 1, 'Occasional software crashes', NULL),
(23, 2.0, 2.0, 1, NULL, NULL),
(24, 3.0, 2.0, 1, 'Intermittent network disconnections', NULL),
(25, 4.0, 2.0, 1, NULL, NULL),
-- Row 3 Col 2
(26, 7.0, 2.0, 1, 'Occasional software installation errors', NULL),
(27, 8.0, 2.0, 1, 'Minor battery charging issues', NULL),
(28, 9.0, 2.0, 1, NULL, NULL),
(29, 10.0, 2.0, 1, NULL, NULL),
-- Row 4 Col 1
(30, 0.0, 3.0, 1, 'Occasional screen flickering during startup', NULL),
(31, 1.0, 3.0, 1, 'USB devices intermittently disconnect', NULL),
(32, 2.0, 3.0, 1, NULL, NULL),
(33, 3.0, 3.0, 1, NULL, NULL),
-- Row 4 Col 2
(34, 6.0, 3.0, 1, 'Minor audio distortion', NULL),
(35, 7.0, 3.0, 1, 'Intermittent display flickering during video playback', NULL),
(36, 8.0, 3.0, 1, NULL, NULL),
(37, 9.0, 3.0, 1, 'Occasional software freezes', NULL),
(38, 10.0, 3.0, 1, 'Minor keyboard key sticking', NULL),
-- Row 5 Col 1
(39, 0.0, 4.0, 1, 'Intermittent network speed fluctuations', NULL),
(40, 1.0, 4.0, 1, NULL, NULL),
(41, 2.0, 4.0, 1, 'Minor touchpad cursor jumping', NULL),
(42, 3.0, 4.0, 1, NULL, NULL),
(43, 4.0, 4.0, 1, NULL, NULL),
-- Row 5 Col 2
(44, 6.0, 4.0, 1, NULL, NULL),
(45, 7.0, 4.0, 1, NULL, NULL),
(46, 8.0, 4.0, 1, 'Intermittent display brightness fluctuations', NULL),
(47, 9.0, 4.0, 1, 'Minor keyboard sticky keys', NULL),
(48, 10.0, 4.0, 1, NULL, NULL),
-- Row 6 Col 1
(49, 0.0, 5.0, 1, 'Bluetooth pairing problems', NULL),
(50, 1.0, 5.0, 1, NULL, NULL),
(51, 2.0, 5.0, 1, 'Occasional system slowdowns', NULL),
(52, 3.0, 5.0, 1, NULL, NULL),
(53, 4.0, 5.0, 1, NULL, NULL),
-- Row 6 Col 2
(54, 6.0, 5.0, 1, NULL, NULL),
(55, 7.0, 5.0, 1, NULL, NULL),
(56, 7.0, 5.0, 1, NULL, NULL),
(57, 9.0, 5.0, 1, 'Slow monitor refresh rate', NULL),
(58, 10.0, 5.0, 1, NULL, NULL),
-- Row 7 Col 1
(59, 0.0, 6.0, 1, 'Crackling on monitor display', NULL),
(60, 1.0, 6.0, 1, 'Issues with HDMI port', NULL),
(61, 2.0, 6.0, 1, NULL, NULL),
(62, 3.0, 6.0, 1, 'Broken displayport', NULL),
-- Row 7 Col 2
(63, 7.0, 6.0, 1, NULL, NULL),
(64, 8.0, 6.0, 1, NULL, NULL),
(65, 9.0, 6.0, 1, NULL, NULL),
(66, 10.0, 6.0, 1, NULL, NULL),
-- Row 8 Col 1
(67, 0.0, 7.0, 1, NULL, NULL),
(68, 1.0, 7.0, 1, 'Slow startup', NULL),
(69, 2.0, 7.0, 1, NULL, NULL),
(70, 3.0, 7.0, 1, NULL, NULL),
(71, 4.0, 7.0, 1, NULL, NULL),
-- Row 8 Col 2
(72, 6.0, 7.0, 1, NULL, NULL),
(73, 7.0, 7.0, 1, NULL, NULL),
(74, 8.0, 7.0, 1, 'Audio output sometimes distorted', NULL),
(75, 9.0, 7.0, 1, NULL, NULL),
(76, 10.0, 7.0, 1, 'Minor overheating during heavy usage', NULL),
-- Row 9 Col 1
(77, 0.0, 8.0, 1, NULL, NULL),
(78, 1.0, 8.0, 1, NULL, NULL),
(79, 2.0, 8.0, 1, NULL, NULL),
(80, 3.0, 8.0, 1, 'Audio output sometimes distorted', NULL),
(81, 4.0, 8.0, 1, NULL, NULL),
-- Row 9 Col 2
(82, 6.0, 8.0, 1, 'Minor display flickering', NULL),
(83, 7.0, 8.0, 1, NULL, NULL),
(84, 8.0, 8.0, 1, 'Has issues loading FireFox', NULL),
(85, 9.0, 8.0, 1, NULL, NULL),
(86, 10.0, 8.0, 1, NULL, NULL);


-- Insert records for lab 2.06 machines (labID = 2)
INSERT INTO machines
(machineID, xPos, yPos, labID, commonIssues, userID)
VALUES
-- Row 1
(1, 0.0, 0.0, 2, 'Minor display flickering', NULL),
(2, 1.0, 0.0, 2, NULL, NULL),
(3, 2.0, 0.0, 2, 'Occasional system slowdowns', NULL),
(4, 3.0, 0.0, 2, NULL, NULL),
(5, 4.0, 0.0, 2, NULL, NULL),
-- Row 2
(6, 0.0, 1.0, 2, NULL, NULL),
(7, 1.0, 1.0, 2, NULL, NULL),
(8, 2.0, 1.0, 2, 'Intermittent display brightness fluctuations', NULL),
(9, 3.0, 1.0, 2, NULL, NULL),
(10, 4.0, 1.0, 2, NULL, NULL),
-- Row 3
(11, 0.0, 2.0, 2, 'Bluetooth pairing problems', NULL),
(12, 1.0, 2.0, 2, NULL, NULL),
(13, 2.0, 2.0, 2, 'Minor mouse cursor jumping', NULL),
(14, 3.0, 2.0, 2, NULL, NULL),
(15, 4.0, 2.0, 2, NULL, NULL),
-- Row 4
(16, 0.0, 3.0, 2, NULL, NULL),
(17, 1.0, 3.0, 2, NULL, NULL),
(18, 2.0, 3.0, 2, NULL, NULL),
(19, 3.0, 3.0, 2, NULL, NULL),
(20, 4.0, 3.0, 2, NULL, NULL),
-- Row 5
(21, 0.0, 4.0, 2, 'Minor audio distortion', NULL),
(22, 1.0, 4.0, 2, NULL, NULL),
(23, 2.0, 4.0, 2, NULL, NULL),
(24, 3.0, 4.0, 2, NULL, NULL),
(25, 4.0, 4.0, 2, NULL, NULL),
-- Column along side
(26, 6.0, 0.5, 2, NULL, NULL),
(27, 6.0, 1.5, 2, NULL, NULL),
(28, 6.0, 2.5, 2, NULL, NULL),
(29, 6.0, 3.5, 2, NULL, NULL);


-- Insert records for lab 2.07 machines (labID = 3)
INSERT INTO machines
(machineID, xPos, yPos, labID, commonIssues, userID)
VALUES
-- Row 1 Col 1
(1, 0.0, 0.0, 3, 'Minor display flickering', NULL),
(2, 1.0, 0.0, 3, NULL, NULL),
(3, 2.0, 0.0, 3, 'Occasional system slowdowns', NULL),
(4, 3.0, 0.0, 3, NULL, NULL),
(5, 4.0, 0.0, 3, NULL, NULL),
-- Row 1 Col 2
(6, 6.0, 0.0, 3, NULL, NULL),
(7, 7.0, 0.0, 3, NULL, NULL),
(8, 8.0, 0.0, 3, 'Intermittent display brightness fluctuations', NULL),
(9, 9.0, 0.0, 3, NULL, NULL),
(10, 10.0, 0.0, 3, NULL, NULL),
-- Row 2 Col 1
(11, 0.0, 1.0, 3, 'Bluetooth pairing problems', NULL),
(12, 1.0, 1.0, 3, NULL, NULL),
(13, 2.0, 1.0, 3, 'Minor mouse cursor jumping', NULL),
(14, 3.0, 1.0, 3, NULL, NULL),
(15, 4.0, 1.0, 3, NULL, NULL),
-- Row 2 Col 2
(16, 6.0, 1.0, 3, NULL, NULL),
(17, 7.0, 1.0, 3, NULL, NULL),
(18, 8.0, 1.0, 3, NULL, NULL),
(19, 9.0, 1.0, 3, NULL, NULL),
(20, 10.0, 1.0, 3, NULL, NULL),
-- Row 3 Col 1
(21, 0.0, 2.0, 3, 'Minor audio distortion', NULL),
(22, 1.0, 2.0, 3, NULL, NULL),
(23, 2.0, 2.0, 3, NULL, NULL),
(24, 3.0, 2.0, 3, NULL, NULL),
(25, 4.0, 2.0, 3, NULL, NULL),
-- Row 3 Col 2
(26, 7.0, 2.0, 3, NULL, NULL),
(27, 8.0, 2.0, 3, NULL, NULL),
(28, 9.0, 2.0, 3, NULL, NULL),
(29, 10.0, 2.0, 3, NULL, NULL),
-- Row 4 Col 1
(30, 0.0, 3.0, 3, NULL, NULL),
(31, 1.0, 3.0, 3, NULL, NULL),
(32, 2.0, 3.0, 3, NULL, NULL),
(33, 3.0, 3.0, 3, NULL, NULL),
-- Row 4 Col 2
(34, 6.0, 3.0, 3, NULL, NULL),
(35, 7.0, 3.0, 3, NULL, NULL),
(36, 8.0, 3.0, 3, NULL, NULL),
(37, 9.0, 3.0, 3, NULL, NULL),
(38, 10.0, 3.0, 3, NULL, NULL);


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

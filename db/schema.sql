
DROP DATABASE IF EXISTS mixtaper;
CREATE DATABASE mixtaper;

USE mixtaper;

-- TABLES WILL BE CREATED BY SEQUELIZE.
-- TABLE SCHEMA FOR REFERENBCE:

-- -- can have many songs
-- -- can have many subscriptions
-- CREATE TABLE Playlists (
--     id INT NOT NULL AUTO_INCREMENT,
--     name VARCHAR(50),
--     FOREIGN KEY user_id REFERENCES Users(id),
--     PRIMARY KEY (id)
-- );

-- -- can have many playlists
-- CREATE TABLE Users (
--     id INT NOT NULL AUTO_INCREMENT,
--     username VARCHAR(50),
--     pssword VARCHAR(50),
--     PRIMARY KEY (id)

-- );

-- -- little baby table. belongs to many 
-- CREATE TABLE Songs (
--     id INT NOT NULL AUTO_INCREMENT,
--     title VARCHAR(50),
--     artist VARCHAR(50),
--     genre VARCHAR(50),
--     link VARCHAR(50),
--     PRIMARY KEY (id)
-- );

-- -- 
-- CREATE TABLE PlaylistSongs (
--     id INT NOT NULL AUTO_INCREMENT,
--     FOREIGN KEY songId REFERENCES Songs(id),
--     FOREIGN KEY playlistId REFERENCES Playlists(id),
--     PRIMARY KEY (id)
-- );

-- -- can have many 
-- CREATE TABLE Subscriptions (
--     id INT NOT NULL AUTO_INCREMENT,
--     FOREIGN KEY userId REFERENCES Users(id),
--     FOREIGN KEY playlistId REFERENCES Playlists(id),
--     PRIMARY KEY (id)
-- );
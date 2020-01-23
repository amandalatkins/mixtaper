USE Playlist_db

-- can have many songs
-- can have many subscriptions
CREATE TABLE playlists (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50),
    FOREIGN KEY user_id REFERENCES users(id),
    PRIMARY KEY (id)
);

-- can have many playlists
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    userName VARCHAR(50),
    email VARCHAR(50),
    userPassword VARCHAR(50),
    PRIMARY KEY (id)

);

-- little baby table. belongs to many 
CREATE TABLE songs (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(50),
    artist VARCHAR(50),
    genre VARCHAR(50),
    link VARCHAR(50),
    PRIMARY KEY (id)
);

-- 
CREATE TABLE PlaylistSongs (
    id INT NOT NULL AUTO_INCREMENT,
    FOREIGN KEY song_id REFERENCES songs(id),
    FOREIGN KEY playlist_id REFERENCES playlists(id),
    PRIMARY KEY (id)
);

-- can have many 
CREATE TABLE subscriptions (
    id INT NOT NULL AUTO_INCREMENT,
    FOREIGN KEY user_id REFERENCES users(id),
    FOREIGN KEY playlist_id REFERENCES playlist(id),
    PRIMARY KEY (id)
);
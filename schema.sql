CREATE DATABASE quiz_db;
USE quiz_db;

# design a table to hold the scores

CREATE TABLE scores
(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    score int(3) NOT NULL,
    PRIMARY KEY (id)
);
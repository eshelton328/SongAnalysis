DROP DATABASE IF EXISTS mvp;

CREATE DATABASE mvp;

USE mvp;

CREATE TABLE songs (
  id int NOT NULL AUTO_INCREMENT,
  songId int NOT NULL,
  name varchar(255) NOT NULL,
  album varchar(255) NOT NULL,
  artist varchar(255) NOT NULL,
  length varchar(255) NOT NULL,
  img varchar(255) NOT NULL,
  PRIMARY KEY(id)
);
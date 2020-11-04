DROP DATABASE IF EXISTS mvp;

CREATE DATABASE mvp;

USE mvp;

DROP TABLE IF EXISTS songs;

CREATE TABLE songs (
  id int NOT NULL AUTO_INCREMENT,
  songId varchar(255) NOT NULL,
  name varchar(255) NOT NULL,
  album varchar(255) NOT NULL,
  artist varchar(255) NOT NULL,
  length varchar(255) NOT NULL,
  img varchar(255) NOT NULL,
  imgLG varchar(255) NOT NULL,
  PRIMARY KEY(id)
);
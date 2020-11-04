const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

const getMySongs = function(callback) {
  connection.query('SELECT * FROM songs', (error, data, fields) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, data);
    }
  });
};

const addMySongs = function(songId, name, album, artist, length, img, imgLG, callback) {
  connection.query(`INSERT INTO songs (songId, name, album, artist, length, img, imgLG) VALUES ('${songId}', '${name}', '${album}', '${artist}', '${length}', '${img}', '${imgLG}')`, (error, data, fields) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, data);
    }
  });
};

module.exports = {
  getMySongs,
  addMySongs
};
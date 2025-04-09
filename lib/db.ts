import sqlite3 from 'sqlite3';

const db = new sqlite3.Database(':memory:'); // Switch to a file for persistence later

db.serialize(() => {
  db.run(`CREATE TABLE songs (id INTEGER PRIMARY KEY, title TEXT, artist TEXT, audioUrl TEXT)`);
  db.run(`CREATE TABLE performances (id INTEGER PRIMARY KEY, userId TEXT, songId INTEGER, audioUrl TEXT, score INTEGER)`);
  db.run(`CREATE TABLE users (id TEXT PRIMARY KEY, username TEXT, score INTEGER)`);

  // Seed songs
  db.run(`INSERT INTO songs (title, artist, audioUrl) VALUES ('Song 1', 'Artist 1', '/audio/song1.mp3')`);
  db.run(`INSERT INTO songs (title, artist, audioUrl) VALUES ('Song 2', 'Artist 2', '/audio/song2.mp3')`);
});

export default db;
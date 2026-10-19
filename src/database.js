const Database = require('better-sqlite3');
const db = new Database('urls.db');


db.exec(`
    CREATE TABLE IF NOT EXISTS urls (
        code TEXT PRIMARY KEY,
        original_url TEXT NOT NULL
    );
`);

module.exports = db;
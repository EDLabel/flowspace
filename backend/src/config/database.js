const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Ensure data directory exists
const dataDir = path.join(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'flowspace.db');
let db = null;

const getDatabase = () => {
    if (!db) {
        db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error('Error opening database:', err.message);
            } else {
                console.log('✅ Connected to SQLite database');
                // Enable foreign keys
                db.run('PRAGMA foreign_keys = ON');
            }
        });
    }
    return db;
};

// Promise-based query methods
const query = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        const database = getDatabase();
        database.all(sql, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const run = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        const database = getDatabase();
        database.run(sql, params, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id: this.lastID, changes: this.changes });
            }
        });
    });
};

module.exports = { getDatabase, query, run };
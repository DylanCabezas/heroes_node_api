const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database("./heroes.sqlite", (err) => {
    if (err) {
        console.error("Error al conectar a SQLite: ", err.message);
    } else {
        console.log("Conectado a la base de datos SQLite.");
        db.run(`CREATE TABLE IF NOT EXISTS heroes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            alias TEXT NOT NULL,
            power TEXT NOT NULL,
            age INTEGER NOT NULL,
            fights INTEGER NOT NULL
        )`, (err) => {
            if (err) {
                console.error("Error al crear la tabla: ", err.message);
            } else {
                console.log("Tabla de heroes creada");
            }
        });
    }
});

module.exports = db;
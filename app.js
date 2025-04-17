const express = require("express");
const db = require("./db.js");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));   

app.get("/heroes", (req, res) => {
    db.all("SELECT * FROM heroes", [], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.json(rows);
    });
});

app.post("/heroes", (req, res) => {
    console.log("Informe de héroe:", req.body);
    const {name, alias, power, age, fights} = req.body;

    if (!name || !alias || !power || !age || !fights) {
        res.status(400).send("Falta completar datos del héroe");
        return;
    }

    const sql = "INSERT INTO heroes (name, alias, power, age, fights) VALUES (?, ?, ?, ?, ?)";
    db.run(sql, [name, alias, power, age, fights], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({message: "Héroe agregado", id: this.lastID, alias: alias});
    });
});

app.get("/heroes/:id", (req, res) => {
    const {id} = req.params;
    db.get("SELECT * FROM heroes WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Héroe no encontrado" });
        res.json(row);
    });  
});

app.put("/heroes/:id", (req, res) => {
    const {id} = req.params;
    const {name, alias, power, age, fights} = req.body;

    if (!name || !alias || !power || !age || !fights) {
        res.status(400).send("Falta completar datos del héroe");
        return;
    }

    const sql = "UPDATE heroes SET name = ?, alias = ?, power = ?, age = ?, fights = ? WHERE id = ?";
    db.run(sql, [name, alias, power, age, fights, id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "Héroe no encontrado" });
        res.json({message: "Héroe actualizado", id: id});
    });
});

app.delete("/heroes/:id", (req, res) => {
    const {id} = req.params;
    const sql = "DELETE FROM heroes WHERE id = ?";
    db.run(sql, [id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "Héroe no encontrado" });
        res.json({message: "Héroe eliminado", id: id});
    });
});

app.listen(port, ("0.0.0.0"), () => {
    console.log(`Servidor ejecutandose en http://localhost:${port}`);
});



        
         
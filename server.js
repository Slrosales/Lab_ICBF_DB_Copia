const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const morgan = require('morgan')

const app = express()
const port = 3000

// Configuración para recibir datos en formato JSON
app.use(express.json())
// Configuracion de morgan
app.use(morgan('dev'))

// Conexión a la base de datos
let db = new sqlite3.Database('./database.db')

db.run(`CREATE TABLE IF NOT EXISTS PADRE (
	id INTEGER PRIMARY KEY,
	nom TEXT
)`)

db.run(`CREATE TABLE IF NOT EXISTS HIJO (
	id INTEGER PRIMARY KEY,
	nom TEXT,
	hijode INTEGER DEFAULT NULL,
	FOREIGN KEY(hijode) REFERENCES PADRE(id)
)`)

// eliminar los registros con nombre null
// db.run(`DELETE FROM PADRE WHERE nom IS NULL`)
// db.run(`DELETE FROM HIJO WHERE nom IS NULL`)

app.use(express.static('public'))

// Rutas
app.get('/', (req, res) => {
    res.send('Servidor funcionando')
})

// Ruta para servir padre.html
app.get('/padre', (req, res) => {
    res.sendFile(__dirname + '/public/padre.html')
})

// Ruta para servir hijo.html
app.get('/hijo', (req, res) => {
    res.sendFile(__dirname + '/public/hijo.html')
})

// Ruta para servir index.html
app.get('/menu', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/consulta1', (req, res) => {
    res.sendFile(__dirname + '/public/consulta1.html')
})

app.get('/consulta2', (req, res) => {
    res.sendFile(__dirname + '/public/consulta2.html')
})

app.get('/consulta3', (req, res) => {
    res.sendFile(__dirname + '/public/consulta3.html')
})

app.get('/consulta4', (req, res) => {
    res.sendFile(__dirname + '/public/consulta4.html')
})

// CRUD para la tabla HIJO
app.get('/hijo/select', (req, res) => {
    db.all(`SELECT * FROM HIJO`, [], (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message })
        }
        res.json(rows)
    })
})

app.post('/hijo/insert', (req, res) => {
    const { id, nom, hijode } = req.body

    const sql = `INSERT INTO HIJO (id, nom, hijode) VALUES (?, ?, ?)`
    db.run(sql, [id, nom, hijode], function (err) {
        if (err) {
            return res.status(400).json({ error: err.message })
        }
        res.json({
            message: 'Registro insertado correctamente',
            lastID: this.lastID
        })
    })
})

app.put('/hijo/update', (req, res) => {
    const { id, nom, hijode } = req.body

    const sql = `UPDATE HIJO SET nom = ?, hijode = ? WHERE id = ?`
    db.run(sql, [nom, hijode, id], function (err) {
        if (err) {
            return res.status(400).json({ error: err.message })
        }
        res.json({
            message: 'Registro actualizado correctamente',
            changes: this.changes
        })
    })
})

// ruta para volver el padre de un hijo null (eliminar la relación)
app.put('/hijo/update-padre', (req, res) => {
    const { id } = req.body

    const sql = `UPDATE HIJO SET hijode = '' WHERE id = ?`
    db.run(sql, [id], function (err) {
        if (err) {
            return res.status(400).json({ error: err.message })
        }
        res.json({
            message: 'Registro actualizado correctamente',
            changes: this.changes
        })
    })
})

app.delete('/hijo/delete', (req, res) => {
    const id = req.body.id

    if (!id) {
        return res.status(400).json({ error: 'Debe enviar el id' })
    }

    const sql = `DELETE FROM HIJO WHERE id = ?`
    db.run(sql, id, function (err) {
        if (err) {
            return res.status(400).json({ error: err.message })
        }
        res.json({
            message: 'Registro eliminado correctamente',
            changes: this.changes
        })
    })
})

// CRUD para la tabla PADRE
app.get('/padre/select', (req, res) => {
    db.all(`SELECT * FROM PADRE`, [], (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message })
        }
        res.json(rows)
    })
})

app.post('/padre/insert', (req, res) => {
    const { id, nom } = req.body

    const sql = `INSERT INTO PADRE (id, nom) VALUES (?, ?)`
    db.run(sql, [id, nom], function (err) {
        if (err) {
            return res.status(400).json({ error: err.message })
        }
        res.json({
            message: 'Registro insertado correctamente',
            lastID: this.lastID
        })
    })
})

app.put('/padre/update', (req, res) => {
    const { id, nom } = req.body

    const sql = `UPDATE PADRE SET nom = ? WHERE id = ?`
    db.run(sql, [nom, id], function (err) {
        if (err) {
            return res.status(400).json({ error: err.message })
        }
        res.json({
            message: 'Registro actualizado correctamente',
            changes: this.changes
        })
    })
})

app.delete('/padre/delete', (req, res) => {
    const id = req.body.id

    const sql = `DELETE FROM PADRE WHERE id = ?`
    db.run(sql, id, function (err) {
        if (err) {
            return res.status(400).json({ error: err.message })
        }
        res.json({
            message: 'Registro eliminado correctamente',
            changes: this.changes
        })
    })
})

// db.all(`SELECT * FROM HIJO`, [], (err, rows) => {
//     if (err) {
//         throw err
//     }
//     rows.forEach((row) => {
//         console.log(row)
//     })
// })

//REVISAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAR
app.get('/padres-disponibles', (req, res) => {
    db.all(`SELECT id, nom FROM PADRE`, [], (err, padres) => {
        if (err) {
            return res.status(400).json({ error: err.message })
        }
        res.json(padres)
    })
})

app.get('/hijos-por-padre/:idPadre', (req, res) => {
    const idPadre = req.params.idPadre
    db.all(
        `SELECT id, nom FROM HIJO WHERE hijode = ?`,
        [idPadre],
        (err, hijos) => {
            if (err) {
                return res.status(400).json({ error: err.message })
            }
            res.json(hijos)
        }
    )
})

app.get('/padres-sin-hijos', (req, res) => {
    db.all(
        `SELECT id, nom FROM PADRE WHERE id NOT IN (SELECT DISTINCT hijode FROM HIJO WHERE hijode IS NOT NULL)`,
        [],
        (err, padres) => {
            if (err) {
                return res.status(400).json({ error: err.message })
            }
            res.json(padres)
        }
    )
})

app.get('/hijos-sin-padre', (req, res) => {
    db.all(
        `SELECT id, nom FROM HIJO WHERE hijode = '' or hijode IS NULL`,
        [],
        (err, hijos) => {
            if (err) {
                return res.status(400).json({ error: err.message })
            }

            res.json(hijos)
        }
    )
})

app.get('/padres-con-cantidad-hijos', (req, res) => {
    db.all(
        `SELECT p.id, p.nom, COUNT(h.id) AS cantidad_hijos 
            FROM PADRE p 
            LEFT JOIN HIJO h ON p.id = h.hijode 
            GROUP BY p.id, p.nom`,
        [],
        (err, resultado) => {
            if (err) {
                return res.status(400).json({ error: err.message })
            }

            res.json(resultado)
        }
    )
})

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`)
})

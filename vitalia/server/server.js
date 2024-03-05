const express = require("express")
const cors = require("cors")
const pool = require("./db")

const app = express()

app.use(express.json())

app.use(cors())

app.get("/api", (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree"] })
})



app.get("/usuario", async (req, res) => {
    try {
        // SQL query to select all users from the 'usuario' table
        const selectSTMT = "SELECT * FROM usuario";

        const result = await pool.query(selectSTMT);

        // Check if records were found
        if (result.rows.length > 0) {
            // Log data to the console
            console.log("Usuarios:", result.rows);
            // Send data as a JSON response
            res.json(result.rows);
        } else {
            // If no records were found, return an error message
            console.log("No se encontraron usuarios.");
            res.status(404).json({ message: "No se encontraron usuarios" });
        }
    } catch (err) {
        // Handle query errors
        console.error("Error al obtener usuarios:", err);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

app.listen(5000, () => console.log("server on localhost 5000"))
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



app.post("/usuario", (req, res) => {
    const {
      fullname,
      weight,
      email,
      date_of_birth,
      password,
      height,
      gender
    } = req.body;
  


    
    // Consultar la cantidad actual de usuarios
    pool.query('SELECT COUNT(*) AS user_count FROM usuario')
      .then((result) => {
        const userCount = parseInt(result.rows[0].user_count, 10);
        const newUserId = userCount + 1;  // Asignar el nuevo ID
  
        console.log("Nuevo ID de usuario:", newUserId);
        console.log("Nombre Completo:", fullname);
        console.log("Contraseña:", password);
        console.log("Altura:", height);
        console.log("Género:", gender);
        console.log("Correo:", email);
        console.log("Fecha de Nacimiento:", date_of_birth);
        console.log("Peso:", weight);
  
        const insertSTMT = `INSERT INTO usuario (user_id, fullname, weight, email, date_of_birth, password, height, gender) 
                            VALUES (${newUserId}, '${fullname}', ${weight}, '${email}', '${date_of_birth}', '${password}', ${height}, '${gender}');`;
  
        pool.query(insertSTMT)
          .then((response) => {
            console.log("Datos guardados:", response);
            res.status(200).send("Usuario registrado exitosamente");
          })
          .catch((error) => {
            console.error("Error al guardar los datos:", error);
            res.status(500).send("Error al registrar el usuario");
          });
      })
      .catch((error) => {
        console.error("Error al obtener la cantidad de usuarios:", error);
        res.status(500).send("Error al registrar el usuario");
      });
  });
  

app.listen(5000, () => console.log("server on localhost 5000"))
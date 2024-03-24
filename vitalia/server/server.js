const express = require("express")
const cors = require("cors")
const pool = require("./db")

const app = express()

app.use(express.json())

app.use(cors())

app.get("/api", (req, res) => {
  res.json({ "users": ["userOne", "userTwo", "userThree"] })
})



app.get("/usuario", (req, res) => {
  // SQL query to select all users with email, password, and ID
  const selectSTMT = 'SELECT "user_id", "email", "password" FROM usuario';

  pool.query(selectSTMT)
    .then((result) => {
      // Send the user data as a JSON response
      res.json(result.rows);
    })
    .catch((err) => {
      // Handle database query errors
      console.error("Error fetching users:", err);
      res.status(500).json({ message: "Internal server error" });
    });
});


app.get("/usuario/:id", (req, res) => {
  // Obtén el ID de usuario de los parámetros de la solicitud
  const userId = parseInt(req.params.id, 10); // Convierte la cadena a un entero

  if (isNaN(userId)) {
    return res.status(400).json({ message: "ID de usuario inválido" });
  }

  // Consulta SQL para seleccionar un usuario específico por ID
  const selectSTMT = `SELECT * FROM usuario WHERE "user_id" = $1`;

  pool.query(selectSTMT, [userId])
    .then((result) => {
      // Verifica si se encontró un usuario con el ID proporcionado
      if (result.rows.length === 1) {
        // Envía los datos del usuario como respuesta JSON
        res.json(result.rows[0]);
      } else {
        // Si no se encontró un usuario con el ID proporcionado, devuelve una respuesta 404
        res.status(404).json({ message: "Usuario no encontrado" });
      }
    })
    .catch((err) => {
      // Maneja errores de consulta a la base de datos
      console.error("Error al obtener usuario:", err);
      res.status(500).json({ message: "Error interno del servidor" });
    });
});


app.post("/usuario", (req, res) => {
  const {
    fullname,
    weight,
    email,
    date_of_birth,
    password,
    height,
    gender,
    diet_type,
    allergies,
    physical_activity,
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
      console.log("Tipo de Dieta:", diet_type);
      console.log("Tipo de Dieta:", allergies);
      console.log("Activdad Fisica:", physical_activity);

      const insertSTMT = `INSERT INTO usuario (user_id, fullname, weight, email, date_of_birth, password, height, gender, diet_type, allergies, physical_activity) 
                            VALUES (${newUserId}, '${fullname}', ${weight}, '${email}', '${date_of_birth}', '${password}', ${height}, '${gender}', '${diet_type}', '{""}', '${physical_activity}' );`;

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


// Endpoint para actualizar un usuario existente
app.put("/usuario/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const {
    weight,
    height,
    diet_type,
    allergies,
  } = req.body;

  const updateSTMT = `UPDATE usuario 
                    SET 
                        weight = ${weight},
                        height = ${height},
                        diet_type = '${diet_type}',
                        allergies = ARRAY[${allergies.map(allergy => `'${allergy}'`).join(', ')}]
                    WHERE user_id = ${userId};`;


  pool.query(updateSTMT)
    .then((response) => {
      console.log("Datos actualizados:", response);
      res.status(200).send("Datos del usuario actualizados exitosamente");
    })
    .catch((error) => {
      console.error("Error al actualizar los datos:", error);
      res.status(500).send("Error al actualizar los datos del usuario");
    });
});



app.listen(5000, () => console.log("server on localhost 5000"))
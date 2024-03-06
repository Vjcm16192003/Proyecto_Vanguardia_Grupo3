import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { AuthContext } from '../AuthContext.js';  // Asegúrate de proporcionar la ruta correcta

function LandingPage() {
  const { idUser } = useContext(AuthContext);  // Accede al idUser desde el contexto
  const [userData, setUserData] = useState(null);
  console.log(idUser)

  useEffect(() => {
    if (!idUser) {
      // Manejar el caso en que idUser no esté disponible (podría redirigir al inicio de sesión)
      console.error('ID de usuario no disponible');
      return;
    }

    Axios.get(`http://localhost:5000/usuario/${idUser}`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error al obtener detalles del usuario:', error);
      });
  }, [idUser]);

  if (!userData) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Bienvenido, {userData.fullname || 'Usuario'}!</h1>
      <p>ID de usuario: {userData.user_id}</p>
      <p>Correo electrónico: {userData.email}</p>
      {/* Agrega más detalles según sea necesario */}
    </div>
  );
}

export default LandingPage;

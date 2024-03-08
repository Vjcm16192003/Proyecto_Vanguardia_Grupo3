import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { AuthContext } from '../AuthContext';  // Asegúrate de proporcionar la ruta correcta

function LandingPage() {
  const { userId } = useContext(AuthContext);  // Corrige el nombre de la propiedad a userId
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!userId) {
      // Manejar el caso en que userId no esté disponible (podría redirigir al inicio de sesión)
      console.error('ID de usuario no disponible');
      // Puedes redirigir al usuario a la página de inicio de sesión o hacer otras acciones
      return;
    }

    Axios.get(`http://localhost:5000/usuario/${userId}`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error al obtener detalles del usuario:', error);
      });
  }, [userId]);

  if (!userId) {
    // Puedes redirigir al usuario a la página de inicio de sesión o hacer otras acciones
    return <div>Usuario no autenticado. Redirigiendo...</div>;
  }

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

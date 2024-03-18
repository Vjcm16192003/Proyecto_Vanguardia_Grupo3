import React from 'react';

function LandingPage() {
  const nuevoUsuario = {
    user_id:  9,
    fullname: 'Marcela Rivera',
    weight: (Math.random() * (200 - 50) + 50).toFixed(2), // Peso aleatorio entre 50 y 200
    email: 'marcela@example.com',
    date_of_birth: '1990-05-15', // Fecha de nacimiento fija
    password: '@12345678',
    height: (Math.random() * (200 - 100) + 100).toFixed(2), // Altura aleatoria entre 100 y 200
    gender: 'Female',
    diet_type: 'Vegetarian', // Tipo de dieta fijo
    allergies: ['Peanuts', 'Shellfish', 'Lactose']
  };

  if (!nuevoUsuario) {
    return <div>No hay información de usuario disponible.</div>;
  }

  return (
    <div>
      <h1>Bienvenido, {nuevoUsuario.fullname || 'Usuario'}!</h1>
      <p>ID de usuario: {nuevoUsuario.user_id}</p>
      <p>Correo electrónico: {nuevoUsuario.email}</p>
      {/* Agrega más detalles según sea necesario */}
    </div>
  );
}

export default LandingPage;









/*import React, { useContext, useEffect, useState } from 'react';
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
    </div>
  );
}

export default LandingPage;*/

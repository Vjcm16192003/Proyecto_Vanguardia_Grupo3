import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { AuthContext } from '../AuthContext';  // Asegúrate de proporcionar la ruta correcta
import './LandingPage.css';  // Importa un archivo CSS para los estilos

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
    <>

      <nav id ="nav">
        <a href="index.html">LOGO</a>

        <div>
          <ul id = "navbar">
            <li><a href="index.html">HOME</a></li>
            <li><a href="index.html">Probar AI</a></li>
            <li><a href="index.html">Registar</a></li>
            <li><a href="index.html">ver Perfil</a></li>
          </ul>
        </div>

      </nav>


       
      <div className="content">
        <h1>Bienvenido, {userData.fullname || 'Usuario'}!</h1>
        <p>ID de usuario: {userData.user_id}</p>
        <p>Correo electrónico: {userData.email}</p>
        <p>Fecha de Nacimiento: {userData.date_of_birth}</p>
         
      </div>
      

      <footer id ="foo">
        <div>
          <ul id = "footer">
            <li><a href="index.html">HOME</a></li>
            <li><a href="index.html">Probar AI</a></li>
            <li><a href="index.html">Registar</a></li>
            <li><a href="index.html">ver Perfil</a></li>
          </ul>
        </div>

      </footer>

    </>
  );
}

export default LandingPage;

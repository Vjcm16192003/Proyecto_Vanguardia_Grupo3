import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { AuthContext } from '../AuthContext';  // Asegúrate de proporcionar la ruta correcta
import './LandingPage.css';  // Importa un archivo CSS para los estilos
import fondo from '../Images/fondo.jpg';
import imagen from '../Images/LandingPage-image1.jpg';

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
    <div id="scrollable-page">
      <nav id="nav">
        <a id="logo">
          <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
            width="80" height="60"
            viewBox="0 0 242 200"
            preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
              fill="#000000" stroke="none">
              <path d="M950 1559 c-204 -76 -249 -92 -468 -171 l-92 -33 2 -393 3 -393 70 -28 c39 -15 106 -41 150 -59 44 -17 154 -60 245 -95 250 -99 294 -114 312 -112 20 4 723 262 749 276 18 9 19 28 19 394 0 368 -1 385 -19 394 -11 6 -57 26 -103 45 -45 18 -144 59 -218 89 -74 31 -196 81 -270 111 -74 31 -142 56 -150 56 -8 -1 -112 -37 -230 -81z m445 -25 c247 -102 379 -156 455 -188 l55 -23 5 -199 c3 -109 3 -280 0 -379 l-5 -179 -370 -137 -370 -136 -65 25 c-131 50 -240 93 -460 179 l-225 88 -3 372 c-2 350 -1 373 16 382 10 5 137 53 282 107 146 54 310 114 365 135 55 21 102 38 105 38 2 1 99 -38 215 -85z" />
              <path d="M921 1333 c64 -86 96 -140 90 -146 -15 -15 -25 -4 -123 126 -107 144 -97 131 -103 126 -2 -3 38 -64 90 -136 52 -73 95 -137 95 -142 0 -30 -34 2 -124 115 -54 68 -101 122 -104 120 -2 -3 37 -59 87 -125 100 -132 111 -151 88 -151 -8 0 -61 57 -116 126 -56 70 -101 123 -101 119 0 -7 139 -217 197 -297 30 -42 39 -48 71 -48 47 0 53 -4 92 -68 32 -52 32 -53 14 -75 -11 -12 -67 -74 -125 -137 -140 -155 -176 -233 -129 -280 11 -11 32 -20 48 -20 61 0 124 66 232 246 28 46 55 86 59 89 5 2 32 -35 62 -83 108 -178 165 -241 225 -249 76 -10 101 64 51 150 -14 24 -78 100 -141 170 -64 69 -116 131 -116 137 0 6 16 35 35 65 33 53 36 55 79 55 l44 0 109 163 c120 178 126 187 120 187 -3 0 -51 -58 -107 -130 -93 -117 -120 -142 -120 -107 0 7 43 68 95 136 52 69 92 127 90 130 -3 2 -6 2 -8 0 -41 -57 -201 -249 -208 -249 -22 0 -5 36 59 123 100 136 115 158 109 163 -2 3 -48 -54 -102 -126 -53 -71 -101 -130 -105 -130 -27 0 -12 33 67 142 98 136 106 148 100 148 -3 0 -64 -71 -137 -157 l-132 -157 6 -51 c6 -50 5 -52 -35 -91 l-41 -39 -39 45 c-21 25 -37 50 -35 57 3 6 7 27 11 45 6 34 -4 47 -226 306 -69 81 -47 41 52 -95z" />
              <path d="M480 1020 c0 -19 7 -20 160 -20 153 0 160 1 160 20 0 19 -7 20 -160 20 -153 0 -160 -1 -160 -20z" />
              <path d="M1530 1020 c0 -19 7 -20 155 -20 148 0 155 1 155 20 0 19 -7 20 -155 20 -148 0 -155 -1 -155 -20z" />
              <path d="M440 960 c0 -19 6 -20 201 -20 186 0 200 1 197 18 -3 15 -22 17 -201 20 -192 2 -197 2 -197 -18z" />
              <path d="M1487 974 c-4 -4 -7 -13 -7 -21 0 -10 41 -13 206 -13 190 0 205 1 202 18 -3 15 -22 17 -199 20 -107 1 -198 -1 -202 -4z" />
              <path d="M482 893 c3 -16 19 -18 158 -18 139 0 155 2 158 18 3 16 -10 17 -158 17 -148 0 -161 -1 -158 -17z" />
              <path d="M1530 890 c0 -19 7 -20 155 -20 148 0 155 1 155 20 0 19 -7 20 -155 20 -148 0 -155 -1 -155 -20z" />
            </g>
          </svg></a>
        <div>
          <ul id="navbar">
            <li><a href="index.html">HOME</a></li>
            <li><a href="index.html">STORE</a></li>
            <li><a href="index.html">RECIPIES</a></li>
          </ul>
        </div>
      </nav>

      <div id="con-image">
        <img src={fondo} alt="Fondo" id="fondo" />
      </div>

      <div id="content">
        <h1 id="info">WELCOME BACK, {userData.fullname || 'Usuario'}!</h1>
      </div>

      <div>
        <h1 id="info1">Why Vitalia?</h1>
        <p id="paragraph">At Vitalia, we understand that no two individuals are alike, and that's why our platform stands out. With a simple and user-friendly interface, you can easily choose Vitalia to be your wellness companion. Say goodbye to generic meal plans and welcome a new era of personalized nutrition that aligns with your specific dietary requirements.</p>
       <div id="con-image1">
        <img src={imagen} alt="imagen" id="infoImage" />
       </div>
      </div>

      <footer id="foo">
        <div class="footer-rights">
          <p>© 2023 Vitalia. All Rights Reserved. </p>

        </div>

      </footer>

    </div>
  );
}

export default LandingPage;

import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { AuthContext } from '../AuthContext';  // Asegúrate de proporcionar la ruta correcta
import './UpdatePerfil.css';  // Importa un archivo CSS para los estilos
import { useNavigate } from 'react-router-dom';



function UpdatePerfil() {


  const navigate = useNavigate();
  const { userId, logout } = useContext(AuthContext);
  // Inicializa userData como null hasta que se carguen los datos
  const [isLoading, setIsLoading] = useState(true); // Para mostrar un indicador de carga mientras se obtienen los datos

  const [allergyCount, setAllergyCount] = useState(0); // Estado para contar los campos de alergias

  const [userData, setUserData] = useState({
    height: 0,
    weight: 0,
    diet_type: 'Normal',
    allergies: [],
  });


  useEffect(() => {
    if (userId) {
      // Llamada a la API para obtener los datos del usuario específico
      Axios.get(`http://localhost:5000/usuario/${userId}`)
        .then(response => {
          setUserData(response.data); // Actualiza el estado con los datos del usuario
          setIsLoading(false); // Indica que la carga ha finalizado
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [userId]); // Ejecuta el efecto solo cuando userId cambia

  const handleChange = e => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };


  const handleClickUpdate = () => {
    handleUpdate(userData);
  };

  const handleLanding = () => {
    navigate('/landing');
  };

  const handleRecipe = () => {
    navigate('/recipe');
  };


  const handleStore = () => {
    navigate('/store');
  };

  const handlePerfil = () => {
    navigate('/perfil');
  };
  
  const handleUpdate = (userData) => {
    const allergies = userData.allergies || []; // Si userData.allergies es undefined o null, se asigna un array vacío
  
    Axios.put(`http://localhost:5000/usuario/${userId}`, { ...userData, allergies })
      .then(response => {
        console.log('Datos actualizados exitosamente:', response.data);
        alert('Datos actualizados con éxito');
        navigate('/perfil');
      })
      .catch(error => {
        console.error('Error al actualizar los datos del usuario:', error);
        alert('Error al actualizar los datos del usuario. Por favor, inténtalo de nuevo.');
      });
  };
  


  const handleSignOutClick = () => {
    localStorage.clear();
    navigate('/');
    logout();
  };


  const handleAllergiesChange = (e, index) => {
    const newAllergies = [...userData.allergies];
    newAllergies[index] = e.target.value;
    setUserData({ ...userData, allergies: newAllergies });
  };

  const handleAddAllergyField = () => {
    const newAllergies = userData.allergies || []; // Inicializa como un array vacío si es nulo o indefinido
    setUserData({ ...userData, allergies: [...newAllergies, ''] });
    setAllergyCount(prevCount => prevCount + 1); // Incrementar la cuenta de alergias
  };


  const handleRemoveAllergyField = index => {
    const newAllergies = Array.isArray(userData.allergies) ? [...userData.allergies] : [];
    newAllergies.splice(index, 1);
    setUserData({ ...userData, allergies: newAllergies });
    setAllergyCount(prevCount => prevCount - 1); // Decrementar la cuenta de alergias
  };

  const [newAllergy, setNewAllergy] = useState('');
  const [showModal, setShowModal] = useState(false);


  const handleAddAllergy = () => {
    setUserData({
      ...userData,
      allergies: [...userData.allergies, newAllergy],
    });
    setNewAllergy('');
  };

  return (
    <div id="scrollable-page1">
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
            <li><a onClick={handleLanding}>HOME</a></li>
            <li><a onClick={handleStore}>STORE</a></li>
            <li><a onClick={handleRecipe}>RECIPES</a></li>
            <li class="dropdown">
              <a href="#">PROFILE</a>
              <div class="dropdown-content">
                <a onClick={handlePerfil}>EDIT PROFILE</a>
                <a onClick={handleSignOutClick}>LOGOUT</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>



      <div className="container2" style={{ paddingTop: `${20 + 8 * allergyCount}vw` }}>
        <div className="registration-box1">
          <h2 id="header-update">Update Profile</h2>


          <div className="form-group1">
            <label htmlFor="height">Height:</label>
            <input
              type="number"
              id="height"
              name="height"
              value={userData.height}
              onChange={handleChange}
              placeholder="Enter your height"
            />
          </div>

          <div className="form-group1">
            <label htmlFor="weight">Weight:</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={userData.weight}
              onChange={handleChange}
              placeholder="Enter your weight"
            />
          </div>

          <div className="form-group1">
            <label htmlFor="diet_type">Diet Type:</label>
            <select
              id="diet_type"
              name="diet_type"
              onChange={handleChange}
              value={userData.diet_type}
            >
              <option value="Vegan">Vegan</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Normal">Normal</option>
            </select>
          </div>

          <div className="form-group1">
            <label htmlFor="allergies">Allergies:</label>
            {userData && userData.allergies && userData.allergies.map((allergy, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={allergy}
                  onChange={e => handleAllergiesChange(e, index)}
                  placeholder="Enter an allergy"
                />
                {index > 0 && (
                  <button type="button3" onClick={() => handleRemoveAllergyField(index)}>Remove</button>
                )}
              </div>
            ))}
            <button type="button2" onClick={handleAddAllergyField}>Add Allergy</button>
          </div>

          <button type="button1" onClick={handleClickUpdate}>Update Data</button>
        </div>
      </div>

    </div>
  );
}

export default UpdatePerfil;
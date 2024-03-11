// Topbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Topbar.css'; // Importar el archivo CSS

const Topbar = ({ isLoggedIn, userType, nombre, handlePerfil, handleSignOutClick }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <nav className="navbar navbar-expand-lg custom-colors custom-navbar">
      <div className="navbar-brand custom-colors">LOGO</div>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuInfo" aria-controls="menuInfo" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse custom-colors justify-content-between" id="menuInfo">
        <ul className="navbar-nav mr-auto custom-colors">
          <li className="nav-item text">
            <div className="nav-link" onClick={() => handleNavigate('/')}>
              INICIO
            </div>
          </li>
          {/* ... (resto de tus elementos de navegación existentes) */}
        </ul>

        {/* Integración del componente Topbar */}
        {isLoggedIn && (
          <div className="nomLCs">
            <div className="d-flex justify-content-end">
              {userType === 'normal' && (
                // Content for normal user dropdown menu
                <div className="nav-item-dropdown">
                  <div className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ whiteSpace: 'normal' }}>
                    <span className="nombreUserL" style={{ fontSize: '18px', color: 'white' }}>
                      {nombre}
                    </span>
                  </div>
                  <div className="dropdown-menu custom-colors independent">
                    <div className="dropdown-item" onClick={() => handleNavigate('/ver-perfil')}>
                      Ver Perfil
                    </div>
                    <div className="dropdown-item" onClick={handleSignOutClick}>
                      Cerrar Sesión
                    </div>
                  </div>
                </div>
              )}

              {/* Añadir lógica similar para otros tipos de usuarios según sea necesario */}
            </div>
          </div>
        )}
        {/* Fin del componente Topbar */}
      </div>
    </nav>
  );
};

export default Topbar;

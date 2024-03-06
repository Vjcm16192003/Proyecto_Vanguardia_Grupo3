import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleSignIn = () => {
	// Enviar solicitud al servidor para obtener todos los usuarios
	fetch('http://localhost:5000/usuario')
	  .then(response => {
		if (response.ok) {
		  return response.json();
		} else {
		  throw new Error('Error al obtener usuarios');
		}
	  })
	  .then(users => {
		// Buscar el usuario con las credenciales proporcionadas
		const foundUser = users.find(user => user.email === email && user.password === password);
  
		if (foundUser) {
		  // Inicio de sesión exitoso, establecer el estado y navegar a la página de inicio
		  console.log('Inicio de sesión exitoso:', foundUser);
		  setLoggedIn(true);
		  setUserId(foundUser.user_id);
		  console.log(foundUser.user_id)
		  // Navegar a la página de destino
		  navigate('/landing');
		} else {
		  // Credenciales incorrectas
		  console.error('Credenciales incorrectas');
		  alert('Credenciales incorrectas');
		}
	  })
	  .catch(error => {
		// Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
		console.error('Error al iniciar sesión:', error.message);
	  });
  };

  
  const handleSignUpClick = () => {
    navigate('/registrar-user');
  };

  return (
    <div className="container" id="container">
      <div className="form-container sign-in-container">
        <form>
          <h1>Sign in</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <a href="#">Forgot your password?</a>
          <button type="button" onClick={handleSignIn}>
            Sign In
          </button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="ghost" id="signIn" onClick={handleSignIn}>
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start your journey with us</p>
            <button className="ghost" id="signUp" onClick={handleSignUpClick}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

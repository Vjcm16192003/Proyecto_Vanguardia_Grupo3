import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext.js'; // Importa el contexto de autenticación
import './Login.css';

function Login() {
  const authContext = React.useContext(AuthContext); // Obtiene el contexto de autenticación
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Definición del nuevo usuario con los atributos proporcionados
  const nuevoUsuario = {
    fullname: 'Marcela Rivera',
    weight: (Math.random() * (200 - 50) + 50).toFixed(2), // Peso aleatorio entre 50 y 200
    email: 'marcela@example.com',
    date_of_birth: '1990-05-15', // Fecha de nacimiento fija
    password: '@12345678',
    height: (Math.random() * (200 - 100) + 100).toFixed(2), // Altura aleatoria entre 100 y 200
    gender: 'Female',
    diet_type: 'Vegetarian', // Tipo de dieta fijo
    allergies: ['Peanuts', 'Shellfish', 'Lactose'][Math.floor(Math.random() * 3)], // Alergia aleatoria
  };

  const handleSignIn = () => {
    // Comprobamos las credenciales ingresadas
    if (email === nuevoUsuario.email && password === nuevoUsuario.password) {
      // Inicio de sesión exitoso, utiliza la función de inicio de sesión del contexto
      authContext.login(7); // Utilizamos el ID fijo 7
      navigate('/landing', { state: { user: nuevoUsuario } });
    } else {
      // Credenciales incorrectas
      console.error('Credenciales incorrectas');
      alert('Credenciales incorrectas');
    }
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



/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext.js'; // Importa el contexto de autenticación
import './Login.css';

function Login() {
  const authContext = React.useContext(AuthContext); // Obtiene el contexto de autenticación
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Tu lógica de inicio de sesión
    fetch('http://localhost:5000/usuario')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error al obtener usuarios');
        }
      })
      .then(users => {
        const foundUser = users.find(user => user.email === email && user.password === password);

        if (foundUser) {
          // Inicio de sesión exitoso, utiliza la función de inicio de sesión del contexto
          authContext.login(foundUser.user_id);
          navigate('/landing');
        } else {
          // Credenciales incorrectas
          console.error('Credenciales incorrectas');
          alert('Credenciales incorrectas');
        }
      })
      .catch(error => {
        // Manejar errores
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

export default Login;*/

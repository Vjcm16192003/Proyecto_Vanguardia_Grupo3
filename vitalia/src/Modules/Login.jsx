import React, { useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {

	const navigate = useNavigate();

    console.log("Login component rendered");

	const handleSignUpClick = () => {
		// Redirige a la página de registro
		navigate('/registrar-user');
	  };

    return (
        
        <div class="container" id="container">
	<div class="form-container sign-up-container">
		<form action="#">
			<h1>Create Account</h1>
			<input type="text" placeholder="Name" />
			<input type="email" placeholder="Email" />
			<input type="password" placeholder="Password" />
			<button>Sign Up</button>
		</form>
	</div>
	<div class="form-container sign-in-container">
		<form action="#">
			<h1>Sign in</h1>
			<input type="email" placeholder="Email" />
			<input type="password" placeholder="Password" />
			<a href="#">Forgot your password?</a>
			<button>Sign In</button>
		</form>
	</div>
	<div class="overlay-container">
		<div class="overlay">
			<div class="overlay-panel overlay-left">
				<h1>Welcome Back!</h1>
				<p>To keep connected with us please login with your personal info</p>
				<button class="ghost" id="signIn">Sign In</button>
			</div>
			<div class="overlay-panel overlay-right">
				<h1>Hello, Friend!</h1>
				<p>Enter your personal details and start your journey with us</p>
				<button class="ghost" id="signUp"  onClick={handleSignUpClick} >Sign Up</button>
			</div>
		</div>
	</div>
</div>
    );
}

export default Login;

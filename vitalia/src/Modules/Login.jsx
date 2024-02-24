import React, { useEffect } from 'react';
import './Login.css';

function Login() {

useEffect(() => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });

    return () => {
      signUpButton.removeEventListener('click', () => {
        container.classList.add("right-panel-active");
      });

      signInButton.removeEventListener('click', () => {
        container.classList.remove("right-panel-active");
      });
    };
  }, []);

  return (
    <div class="container" id="container">
	<div class="form-container sign-in-container">
		<form action="#">
			<h1>Sign in</h1>
			<input type="email" placeholder="Email" />
			<input type="password" placeholder="Password" />
			<a href="#">Forgot your password?</a>
			<button>Sign In</button>
		</form>
	</div>
		<div class="overlay-panel overlay-right">
			<h1 style="color: white;">Hello, Friend!</h1>
			<p style="color: white; font-size: 100%;">Enter your personal details and start your journey with us</p>
			<button class="ghost" id="signUp">Sign Up</button>
		</div>
	</div>
  );
}

export default Login;
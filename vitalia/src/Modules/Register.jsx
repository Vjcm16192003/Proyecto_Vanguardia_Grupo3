import React from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';

function Register() {
    return (

        <div className="scrollable-page">
            <div className="container1">
                <div className="registration-box">
                    <h2 id="header-register">Registrate Ahora!</h2>

                    <div className="form-group">
                        <label htmlFor="fullName">Full Name:</label>
                        <input type="text" id="fullName" placeholder="Enter your full name" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="weight">Weight:</label>
                        <input type="number" id="weight" placeholder="Enter your weight (in kg)" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" placeholder="Enter your email" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="dob">Date of Birth:</label>
                        <input type="date" id="dob" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" placeholder="Enter your password" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="height">Height:</label>
                        <input type="number" id="height" placeholder="Enter your height (in cm)" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="gender">Gender:</label>
                        <select id="gender">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>


                    <button type="submit">Sign Up</button>
                </div>
            </div>
        </div>


    );
}

export default Register;

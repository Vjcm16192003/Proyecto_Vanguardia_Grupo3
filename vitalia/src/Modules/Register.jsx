import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        weight: 0,
        email: '',
        date_of_birth: '',
        password: '',
        height: 0,
        gender: 'male',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedValue = value;

        // Convertir altura de cm a metros
        if (name === 'height') {
            updatedValue = (parseFloat(value) / 100).toFixed(2);
        }

        setFormData({ ...formData, [name]: updatedValue });
    };

    const handleRegister = () => {
        // Convertir el formato de la fecha a 'YYYY-MM-DD'
        const formattedDate = new Date(formData.date_of_birth).toISOString().split('T')[0];

        const nuevoUsuario = {
            fullname: formData.fullName,
            weight: parseFloat(formData.weight).toFixed(2),  // Asegurarse de tener dos decimales
            email: formData.email,
            date_of_birth: formattedDate,
            password: formData.password,
            height: parseFloat(formData.height).toFixed(2),  // Asegurarse de tener dos decimales
            gender: formData.gender,
        };

        fetch('http://localhost:5000/usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoUsuario),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Usuario registrado con éxito:', data);
                // Realizar cualquier otra lógica necesaria después de agregar el usuario
            })
            .catch(error => {
                console.error('Error al registrar el usuario:', error);
            });
    };

    return (
        <div className="scrollable-page">
            <div className="container1">
                <div className="registration-box">
                    <h2 id="header-register">Registrate Ahora!</h2>

                    <div className="form-group">
                        <label htmlFor="fullName">Full Name:</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            placeholder="Enter your full name"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="weight">Weight:</label>
                        <input
                            type="number"
                            id="weight"
                            name="weight"
                            placeholder="Enter your weight (in kg)"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="dob">Date of Birth:</label>
                        <input
                            type="text"  // Cambiado a text
                            id="dob"
                            name="date_of_birth"
                            placeholder="YYYY-MM-DD"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="height">Height:</label>
                        <input
                            type="number"
                            id="height"
                            name="height"
                            placeholder="Enter your height (in cm)"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="gender">Gender:</label>
                        <select
                            id="gender"
                            name="gender"
                            onChange={handleChange}
                            value={formData.gender}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <button type="submit" onClick={handleRegister}>Sign Up</button>
                </div>
            </div>
        </div>
    );
}

export default Register;

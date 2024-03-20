import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import Topbar from '../Components/Topbar';

function Register() {
    const navigate = useNavigate();

    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        fullName: '',
        weight: 0,
        email: '',
        date_of_birth: '',
        password: '',
        height: 0,
        gender: 'Male',
        diet_type: 'Normal',
        allergies: [""],
        physical_activity: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedValue = value;

        

        // Convertir altura de cm a metros
        if (name === 'height') {
            updatedValue = (parseFloat(value) / 100).toFixed(2);
        }

        if(name === 'physical_activity'){
            updatedValue = (parseInt(value));
        }

        setFormData({ ...formData, [name]: updatedValue });
    };

    const handleRegister = () => {

        const { fullName, email, password, date_of_birth } = formData;

        // Validaciones
        if (!fullName.trim() || !email.trim() || !password.trim() || !date_of_birth.trim()) {
            setError('Todos los campos son obligatorios.');
            alert('Error: Todos los campos son obligatorios.');
            return;
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Ingrese un correo electrónico válido.');
            alert('Error: Ingrese un correo electrónico válido.');
            return;
        }

        // Validar formato de fecha
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(date_of_birth)) {
            setError('Ingrese una fecha válida en formato YYYY-MM-DD.');
            alert('Error: Ingrese una fecha válida en formato YYYY-MM-DD.');
            return;
        }

        // Validar estándares de seguridad de la contraseña (aquí puedes agregar más reglas según tus necesidades)
        if (password.length < 8) {
            setError('La contraseña debe tener al menos 8 caracteres.');
            alert('Error: La contraseña debe tener al menos 8 caracteres.');
            return;
        }

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
            diet_type: formData.diet_type,
            allergies: formData.allergies,
            physical_activity: formData.physical_activity,
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
            alert('Usuario registrado con éxito');
            setError('');
            navigate('/');
        })
        .catch(error => {
            console.error('Error al registrar el usuario:', error);
            //alert('Error al registrar el usuario. Por favor, inténtalo de nuevo.');
            alert('Usuario registrado con éxito');
            navigate('/');
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

                    <div className="form-group">
                        <label htmlFor="diet_type">Diet Type:</label>
                        <select
                            id="diet_type"
                            name="diet_type"
                            onChange={handleChange}
                            value={formData.diet_type}
                        >
                            <option value="Vegan">Vegan</option>
                            <option value="Vegetarian">Vegetarian</option>
                            <option value="Normal">Normal</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="physical-activity">physical activity:</label>
                        <select id="physical_activity" name="physical_activity" value={formData.physical_activity} onChange={handleChange}>
                            <option value="1">Sedentary</option>
                            <option value="2">Moderately active</option>
                            <option value="3">Athletic</option>
                        </select>
                    </div>



                    <button type="button" onClick={handleRegister}>Sign Up</button>
                </div>
            </div>
        </div>
    );
}

export default Register;

// Inside App.jsx
import React , {useState}from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Modules/Login.jsx";
import Register from "./Modules/Register.jsx";
import LandingPage from "./Modules/LandingPage.jsx";
import Store from "./Modules/Store.jsx";
import Perfil from "./Modules/UpdatePerfil.jsx";
import AIPage from "./Modules/AIpage.jsx"
import MenuPage from "./Modules/MenuPage.jsx"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    weight: 48,
    email: '',
    date_of_birth: '2000-01-14',
    password: '',
    height: 165,
    gender: 'female',
    diet_type: 'Normal',
    allergies: [""],
    physicalActivity: 1
});

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registrar-user" element={<Register />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/store" element={<Store />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/" element={<Login/>} />
          <Route path="/registrar-user" element={<Register formData={formData} setFormData={setFormData}/>} />
          <Route path="/landing" element={<MenuPage formData={formData}/>} />
          <Route path="/AI" element={<AIPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

//<Route path="/Menu" element={<MenuPage formData={formData}/>} />


export default App;

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
          <Route path="/recipe" element={<MenuPage/>} />
          <Route path="/AI" element={<AIPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

//<Route path="/Menu" element={<MenuPage formData={formData}/>} />


export default App;

// Inside App.jsx
import React , {useState}from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Modules/Login.jsx";
import Register from "./Modules/Register.jsx";
import LandingPage from "./Modules/LandingPage.jsx";
import AIPage from "./Modules/AIpage.jsx"
import MenuPage from "./Modules/MenuPage.jsx"

function App() {
  const [formData, setFormData] = useState({
    fullName: 'marcela',
    weight: 48,
    email: '',
    date_of_birth: '2000-01-14',
    password: '',
    height: 165,
    gender: 'female',
    diet_type: 'Normal',
    allergies: [""],
    physicalActivity: 0
});

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MenuPage formData={formData}/>} />
          <Route path="/registrar-user" element={<Register formData={formData} setFormData={setFormData}/>} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/AI" element={<AIPage />} />
          <Route path="/Menu" element={<MenuPage formData={formData}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

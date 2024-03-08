// Inside App.jsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Modules/Login.jsx";
import Register from "./Modules/Register.jsx";
import LandingPage from "./Modules/LandingPage.jsx";

function App() {
  console.log("App component rendered");
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registrar-user" element={<Register />} />
          <Route path="/landing" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

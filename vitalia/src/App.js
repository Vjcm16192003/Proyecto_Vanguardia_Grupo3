// Inside App.jsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Modules/Login.jsx";

function App() {
  console.log("App component rendered");
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

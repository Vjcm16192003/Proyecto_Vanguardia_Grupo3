import React from "react";
import {
  BrowserRouter,
  //createBrowserRouter,
  Route,
  //RouterProvider,
  Routes,
} from "react-router-dom";

//Imports para rutas
import Login from "./Modules/Login";

function App() {
  return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login/>} />
          </Routes>
        </BrowserRouter>
  );
}

export default App;

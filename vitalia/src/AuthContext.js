import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Intenta obtener los datos almacenados en localStorage al cargar la página
  const storedUserId = localStorage.getItem('userId');
  const storedLoggedIn = localStorage.getItem('loggedIn') === 'true';

  const [userId, setUserId] = useState(storedUserId || null);
  const [loggedIn, setLoggedIn] = useState(storedLoggedIn || false);

  useEffect(() => {
    // Almacena los datos en localStorage cada vez que cambian
    localStorage.setItem('userId', userId);
    localStorage.setItem('loggedIn', loggedIn);
  }, [userId, loggedIn]);

  const login = (id) => {
    setUserId(id);
    setLoggedIn(true);
  };

  const logout = () => {
    setUserId(null);
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ userId, loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };

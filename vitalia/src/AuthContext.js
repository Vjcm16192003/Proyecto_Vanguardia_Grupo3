import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

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

export { AuthContext};

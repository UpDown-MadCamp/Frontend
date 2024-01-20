// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setusername] = useState('sample');
  const [email, setemail] = useState('sample@example.com');

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, username, setusername, email, setemail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
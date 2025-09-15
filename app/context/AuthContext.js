
"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Cargar usuario desde localStorage al iniciar la app
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const register = (name, email, password) => {
    return new Promise((resolve, reject) => {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userExists = users.find(user => user.email === email);

      if (userExists) {
        return reject(new Error('El correo electrónico ya está en uso.'));
      }

      const newUser = { id: Date.now(), name, email, password };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      resolve(newUser);
    });
  };

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(user => user.email === email && user.password === password);

      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        setCurrentUser(user);
        resolve(user);
      } else {
        reject(new Error('Credenciales incorrectas.'));
      }
    });
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

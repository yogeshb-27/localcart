import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const adminPresent = localStorage.getItem("isAdmin");
    setToken(storedToken);
    setIsAdmin(adminPresent);
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout, setIsAdmin, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

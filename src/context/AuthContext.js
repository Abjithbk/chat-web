import { createContext, useContext, useState } from "react";

// Create the context
const AuthContext = createContext();

// Hook to use auth
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("accessToken");
    const username = localStorage.getItem("username");
    return token ? { token, username } : null;
  });

  const login = (token, username) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("username", username);
    setAuth({ token, username });
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

import { useState, createContext, useContext } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  setAccessToken: (_) => {},
  clearAccessToken: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(
    () => !!sessionStorage.getItem("access_token")
  );

  const setAccessToken = (token) => {
    sessionStorage.setItem("access_token", token);
    setAuthenticated(true);
  };

  const clearAccessToken = () => {
    sessionStorage.removeItem("access_token");
    setAuthenticated(false);
  };
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setAccessToken, clearAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

import { createContext, useContext, useEffect, useState } from "react";
import {
  AuthContextProviderProps,
  AuthContextType,
  AuthUser,
} from "../types/authContext";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const storedValue = localStorage.getItem("user");

  const [currentUser, setCurrentUser] = useState<AuthUser | null>(
    storedValue ? JSON.parse(storedValue) : null
  );

  const updateUser = (data: AuthUser | null) => setCurrentUser(data);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext used outside the provider.");
  }

  return context;
};

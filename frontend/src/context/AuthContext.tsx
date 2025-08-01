import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface UserData {
  id: string;
  name: string;
  email: string;
  verified: boolean;
  photo: string;
}

interface AuthContextType {
  user: UserData | null;
  token: string | null;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/me`, {
          withCredentials: true,
        });
        console.log("Data User:", res.data.user);
        console.log("Token:", res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
      } catch (error) {
        console.error("❌ Gagal decode token:", error);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      setToken(null); // Clear token di state
      setUser(null); // Clear user di state
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvide");
  return context;
};

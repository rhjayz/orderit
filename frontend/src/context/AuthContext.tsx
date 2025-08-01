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
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/me}`,
          { withCredentials: true }
        );
        console.log("Data User:", res.data.user);
        setUser(res.data.user);
      } catch (error) {
        console.error("❌ Gagal decode token:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvide");
  return context;
};

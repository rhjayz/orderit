import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";


interface UserData {
   id: string;
  name: string;
  email: string;
  verified: boolean;
  photo: string;
}

interface AuthContextType {
  token: string | null;
  user: UserData | null;
}

export const AuthContext = createContext<AuthContextType>({ token: null , user : null});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
    
  useEffect(() => {
      const storedToken = Cookies.get("token");
      console.log("🔍 Token dari Cookies:", storedToken);        
      setToken(storedToken || null);
    
        if (storedToken) {
          try {
            const decoded: UserData = jwtDecode(storedToken);
            console.log("Data JWT", decoded);
            setUser(decoded);
            } catch (error) {
            console.error("❌ Gagal decode token:", error);
            }
      }
    }, []);
      

  return (
  <AuthContext.Provider value={{ token, user }}>
      {children}
    </AuthContext.Provider>
  );
};
  export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvide");
    return context;
  }
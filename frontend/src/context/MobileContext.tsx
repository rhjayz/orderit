import { createContext, useState, useEffect, ReactNode, useContext, useMemo } from "react";

interface MobileContextType {
  isMobile: boolean;
}

export const MobileContext = createContext<MobileContextType | undefined>(undefined);

export const MobileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);

useEffect(() => {
  const handleResize = () => {
    clearTimeout((window as any).__resizeTimeout);
    (window as any).__resizeTimeout = setTimeout(() => {
      setIsMobile(window.innerWidth <= 992);
    }, 200);
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);


const value = useMemo(() => ({ isMobile }), [isMobile]);
    
  return (
    <MobileContext.Provider value={value}>
      {children}
    </MobileContext.Provider>
  );
};

export const useMobile = () => {
    const context = useContext(MobileContext);
    if (!context) throw new Error("useMobile must be used within MobileProvidee");
    return context;
  }

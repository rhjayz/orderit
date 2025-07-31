import { createContext, useContext, useState, ReactNode} from "react";

interface ToastContextType {
    showToast: (message: string, type?: "success" | "error") => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toast, setToast] = useState<{ message: string, type: string } | null>(null);

    const showToast = (message: string, type: "success" | "error" = "success") => {
        setToast({ message, type });
        
        setTimeout(() => {
            setToast(null);
        }, 3000)
    };
    return (
        
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && (
                <div className="toast-container position-absolute top-0 end-0 p-3">
                    <div className={`toast show bg-${toast.type === "success" ? "success" : "danger"} text-white`} role="alert">
                        <div className="toast-header">
                            <strong className="me-auto">{toast.type === "success" ? "Success" : "Error"}</strong>
                            <button className="btn-close" onClick={() => setToast(null)}></button>
                        </div>
                        <div className="toast-body">
                            {toast.message}
                        </div>
                    </div>
                </div>
            )}
        </ToastContext.Provider>
        
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error("useToast must be used within ToastProvide");
    return context;
};
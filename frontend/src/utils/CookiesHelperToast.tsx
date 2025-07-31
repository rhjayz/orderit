import { useEffect } from "react";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export const useDashboardVisit = () => {
    const { token, user } = useAuth();
    const location = useLocation();
    const { showToast } = useToast();
    
    useEffect(() => {

        if (!token) {
            // ⬅️ Jika tidak ada token, hapus cookies dan redirect ke login
            Cookies.remove("hasVisitedDashboard");
            Cookies.remove("token");
            return;
        }

        if (location.pathname === "/dashboard" && !Cookies.get("hasVisitedDashboard")) {
            Cookies.set("hasVisitedDashboard", "true", { expires: 1 });
            showToast(`Welcome Sir! ${user?.name}`, "success");
        }
    }, [location.pathname, showToast]);
};

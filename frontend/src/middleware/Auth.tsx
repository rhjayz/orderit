import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

type AuthMiddlewareCheck = {
  status: boolean; // Status kontrol middleware
};

const Auth: React.FC<AuthMiddlewareCheck> = (status) => {
  const { token, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      console.log("User not logged in, redirecting to /login");
      if (
        ![
          "/login",
          "/register",
          "/forgotpassword",
          "/newpassword",
          "/resultresetpassword",
          "/",
        ].includes(location.pathname)
      ) {
        navigate("/login", { replace: true });
      }
      return;
    }

    if (user?.verified !== true) {
      console.log("User not verified, redirecting to /verifyaccount");
      if (location.pathname !== "/verifyaccount") {
        navigate("/verifyaccount", { replace: true });
      }
      return;
    }

    if (
      [
        "/login",
        "/register",
        "/forgotpassword",
        "/newpassword",
        "/resultresetpassword",
        "/",
      ].includes(location.pathname)
    ) {
      console.log("User already logged in, redirecting...");

      // Jika sebelumnya ada halaman lain, balik ke halaman sebelum login
      if (window.history.length > 2) {
        navigate(-1);
      } else {
        // Kalau history kosong, arahkan ke /dashboard tanpa merusak branch lain
        navigate("/dashboard", { replace: true });
      }
    }

    console.log("User verified, allowing access");
  }, [token, user?.verified, navigate, location.pathname, status]);

  return <Outlet />;
};

export default Auth;

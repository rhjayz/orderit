import { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { MobileProvider } from "./context/MobileContext.tsx";
import Loading from "./Loading.tsx";
import Index from "./Index.tsx";
import Login from "./components/auth/Login.tsx";
import Register from "./components/auth/Register.tsx";
import Forgotpassword from "./components/auth/Forgotpassword.tsx";
import Newpassword from "./components/auth/Newpassword.tsx";
import Resultresetpassword from "./components/auth/Resultresetpassword.tsx";
import TemplateLayout from "./components/template/TemplateLayout.tsx";
import Dashboard from "./components/pages/Dashboard/Index.tsx";
import Branch from "./components/pages/Branch/Index.tsx";
import VerifyAccount from "./components/404/VerifyAccount.tsx";
import Auth from "./middleware/Auth.tsx";
import "/src/assets/css/index.css";
import "./middleware/Auth.tsx";

function Main() {
  const [loading, setLoading] = useState(true);
  return (
    <ToastProvider>
      <AuthProvider>
        <MobileProvider>
          {loading ? (
            <Loading onFinish={() => setLoading(false)} />
          ) : (
            <BrowserRouter>
              <Routes>
                {/* Public Route */}
                <Route element={<Auth status={false} />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgotpassword" element={<Forgotpassword />} />
                  <Route path="/newpassword" element={<Newpassword />} />
                  <Route
                    path="/resultresetpassword"
                    element={<Resultresetpassword />}
                  />
                </Route>
                <Route element={<Auth status={true} />}>
                  <Route path="/verifyaccount" element={<VerifyAccount />} />
                  <Route element={<TemplateLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/branch" element={<Branch />} />
                  </Route>
                </Route>
              </Routes>
            </BrowserRouter>
          )}
        </MobileProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

createRoot(document.getElementById("root")!).render(<Main />);

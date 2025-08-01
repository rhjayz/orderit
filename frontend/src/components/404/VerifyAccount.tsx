import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "/src/assets/css/Auth.css";
import { useAuth } from "../../context/AuthContext";

function VerifyAccount() {
  const { user, logout } = useAuth();
  const handleLogout = async () => {
    try {
      await logout(); // Panggil logout API untuk clean session di server (optional)
      Cookies.remove("token");
    } catch (error) {
      console.log("Logout failed", error);
    }
  };
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const fadeTimeout = setTimeout(() => setFadeIn(true), 100);
    return () => {
      clearTimeout(fadeTimeout);
    };
  }, []);

  return (
    <>
      <div className={`index-page verify-email ${fadeIn ? "fade-in" : ""}`}>
        <div className="container-fluid">
          <div className="row d-flex justify-content-center">
            <div className="col-md-5 mt-5">
              <div className="container mt-5">
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    src="./orderit.svg"
                    alt="Logo"
                    width="60px"
                    height="60px"
                  />
                </div>
                <div className="card justify-content-center p-5 mt-2">
                  <div className="card-content">
                    <div className="content">
                      <h1 className="auth-title text-center">
                        Email Verification
                      </h1>
                      <small className="form-text text-muted auth-subtitle w-75">
                        Hello <b>{user?.name}</b>, Please check your email and
                        follow the instructions to verify your account.
                      </small>
                    </div>
                    <form className="auth-form">
                      <br />
                      <div className="text-center mt-4">
                        <button
                          type="submit"
                          className="btn btn-prime w-100 mb-2"
                          onClick={handleLogout}
                        >
                          <b>Logout</b>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VerifyAccount;

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import PhotoProfile from "../../assets/photoprofile.png";
import { Dropdown } from "bootstrap";
import Cookies from "js-cookie";
import { useDashboardVisit } from "../../utils/CookiesHelperToast";

function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState<string>("");
  const name = user?.name || "Rjhayz";
  const img = user?.photo || PhotoProfile;
  let offcanvas: any = null;

  useDashboardVisit();

  const handleLogout = async () => {
    try {
      await logout();
      Cookies.remove("hasVisitedDashboard");
      window.location.href = "/login";
    } catch (error) {
      console.log(error, "Logout Failed");
    }
  };

  const handleToggle = () => {
    if (offcanvas) {
      offcanvas.toggle();
    }
  };

  useEffect(() => {
    const title = localStorage.getItem("activePage") || "Location";
    setPageTitle(title);
  }, [location.pathname]);

  useEffect(() => {
    const dropdownBtn = document.querySelector("#dropdownNavbar");

    if (dropdownBtn) {
      dropdownBtn.addEventListener("click", () => {
        console.log("Klik tombol berhasil!");
      });
      const dropdownInstance = new Dropdown(dropdownBtn, { autoClose: true });
      dropdownBtn.addEventListener("click", () => {
        dropdownInstance.toggle();
      });
      console.log("Dropdown event listener ditambah:", dropdownBtn);
    }
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-white border-bottom bg-white pb-3 pt-1">
        <div className="container-fluid">
          <button
            className="btn d-md-none mt-2"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            onClick={handleToggle}
          >
            ☰
          </button>
          <a className="navbar-brand mt-2 fs-5 mx-1">{pageTitle}</a>
          <div className="dropdown">
            <a
              href="#"
              className="d-flex align-items-center justify-content-center mt-2 p-1 link-dark text-decoration-none dropdown-toggle"
              id="dropdownNavbar"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={img}
                alt="mdo"
                width="30"
                height="30"
                className="rounded-circle"
              />
            </a>
            <ul
              className="dropdown-menu text-small shadow dropdown-menu-end"
              aria-labelledby="dropdownNavbar"
            >
              <li>
                <a className="dropdown-item">
                  <b>Hi, {name}</b>
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/profile">
                  Profile
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={handleLogout}>
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

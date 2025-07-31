import { MdOutlineSpaceDashboard, MdOutlineReceipt, MdOutlineEggAlt, MdPersonOutline } from "react-icons/md";
import { LiaStoreAltSolid } from "react-icons/lia";
import { TbSettings2 } from "react-icons/tb";
import { useState, useEffect, useRef} from "react";
import { Link, useLocation } from "react-router-dom";
import * as bootstrap from "bootstrap";


function Sidebar() {
  const location = useLocation();
  const [active, setActive] = useState<string | null>(null);
  const offcanvasRef = useRef<HTMLDivElement>(null);
  let offcanvas: any = null;

  const handleClick = (menu: string) => {
    setActive(menu);
    };

  const menuItems = [
    { key: "dashboard", label: "Dashboard", link: "/dashboard", icon: <MdOutlineSpaceDashboard size={25} /> },
    { key: "branch", label: "Branch", link: "/branch", icon: <LiaStoreAltSolid size={25} /> },
    { key: "order", label: "Order", link: "/order", icon: <MdOutlineReceipt size={25} /> },
    { key: "menu_management", label: "Menu Management", link: "/menuManagement", icon: <MdOutlineEggAlt size={25} /> },
    { key: "staff", label: "Staff", link: "/staff", icon: <MdPersonOutline size={25} /> },
    { key: "settings", label: "Settings", link: "/settings", icon: <TbSettings2 size={25} /> },
  ];


  const buttonClose = () => {
    const sidebar = document.getElementById("sidebarMenu");
    const backdrop = document.querySelector(".offcanvas-backdrop");
    if (sidebar && backdrop) {
      const offcanvas = bootstrap.Offcanvas.getInstance(sidebar);
      offcanvas?.hide();
      backdrop.remove();
    }
  }

  useEffect(() => {
    if (offcanvasRef.current) {
      offcanvas = new (window as any).bootstrap.Offcanvas(offcanvasRef.current);
    }

    return () => {
      if (offcanvas) {
        offcanvas.dispose();
      }
    }
  },[])

 useEffect(() => {
  document.querySelectorAll(".offcanvas").forEach((el) => {
    const instance = bootstrap.Offcanvas.getOrCreateInstance(el) as any;
    console.log("Instance:", instance);
    console.log("Backdrop:", instance._backdrop);
  });
}, []);

  
  useEffect(() => {
    const currentMenu = menuItems.find((item) => item.link === location.pathname);
    if(currentMenu){
      setActive(currentMenu.key);
      localStorage.setItem("activePage", currentMenu.label);
    }
  },[location]);


  return (
    <>
    
      {/* Sidebar (Desktop & Mobile) */}
      <div
        className="offcanvas-md offcanvas-start bg-light d-flex flex-column widthsidebar"
        data-bs-backdrop="dynamis"
        tabIndex={-1}
        id="sidebarMenu"
        ref={offcanvasRef}
      >
        <div className="p-3 bg-white w-100 d-flex flex-column fullhsidebar">
          <button
            type="button"
            className="btn-close d-md-none align-self-end"
            onClick={()=>buttonClose()}
            aria-label="Close"
            data-bs-dismiss="offcanvas"
          ></button>
          {/* Brand */}
          <a className="d-flex align-items-center link-dark text-decoration-none mb-3">
            <img src="./orderit.svg" height="30px" width="30px" className="m-0" />
            <p className="fs-5 font-weight-bold mt-1 mb-0">
              <b>Orderit</b>
            </p>
          </a>
          <hr className="m-0 p-2" />
          {/* Sidebar Menu */}
  
            <ul className="nav nav-pills flex-column mb-auto">
            {menuItems.map(({ key, label, icon, link }) => (
              <li className="nav-item" key={key}>
                <Link
                  to={link}             
                  className={`nav-link d-flex gap-2 navton mb-2 ${active === key ? "active" : ""}`}
                  onClick={() => handleClick(key)}
                >
                  {icon} {label}
                </Link>
              </li>
            ))}
            </ul>
    
        </div>
      </div>
    </>
  );
}

export default Sidebar;

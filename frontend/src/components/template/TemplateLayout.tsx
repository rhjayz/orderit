import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "/src/assets/css/Template.css";


function TemplateLayout() {
    return (
      <>
        <div className="d-flex">
            <Sidebar />
            <div className="content flex-grow-1 bg-base">
              <Navbar />
              <Outlet />  
            </div>
    </div>
    </>  
    )
}

export default TemplateLayout;
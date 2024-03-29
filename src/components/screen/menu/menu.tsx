

import { useContext, useState } from "react";
import "../../../css/menu.css"

import { FaHome,FaSignOutAlt} from 'react-icons/fa';
import { NavigateFunction, useNavigate} from "react-router-dom";
import { NavLink } from "react-router-dom";
import MenuDesplegable from "./logica.menu";
import { ThemeContext } from "../../../contextAll/theme";



const Menu = () => {

 

  const navigate:NavigateFunction = useNavigate();
   const [isOpen, setIsOpen] = useState(false);
  let authToken: string | null = localStorage.getItem("authToken");
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("Menu must be used within a ThemeProvider");
  }

  const { theme, toggleTheme } = themeContext;

  console.log(theme);

 
    return ( 
        <>
       
       <div className="cont-opcion">
        {/* aqui van las partes que se despliegan */}

          <h1 className="gestix">Gestix</h1>
        <div className="inicio">
          <NavLink to="/inicio"><FaHome/> Inicio</NavLink>
         
          </div>
       
        <MenuDesplegable/>
        </div>
        {
          authToken !== ""?
        <div className="cont-user">
            <img src={localStorage.getItem("authPerfil") || ""} alt="" />
            <p className="name-user">{localStorage.getItem("authName")}</p>

           
        </div>
        :
        // aqui va la parte de ir a registrarse cuando el usuario no tiene sesion abierta
        <div className="log">
      <button onClick={() => setIsOpen(!isOpen)}>
        Logiarse
      </button>
      {isOpen && (
        <div className="cont-log">
          <button onClick={() => navigate("/inicia de session")}>
            <FaSignOutAlt className="icono"/>
            Iniciar sesión
          </button>
          <button onClick={() => navigate("/registrate")}>
          <FaSignOutAlt className="icono"/>
            Registrarse
          </button>
        </div>
      )}
    </div>

        }
 
        </>
     );
}
 
export default Menu;
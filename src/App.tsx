import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import "./css/principal.css";
import './App.css';
import Login from './components/login/login';
import Registro from './components/login/registrarse';
import Error404 from './Error404';
import ScreenPrincipal from './components/screen/screen.principal';
import Menu from './components/screen/menu/menu';
import Contenido from './components/screen/contenido';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const shouldShowMenu = () => {
    const isHome = location.pathname === '/' || location.pathname === '/inicio';
    const isContenidoRoute = location.pathname.startsWith('/contenido/');
    return isHome || isContenidoRoute;
  };

  return (
    <>
      {shouldShowMenu() ? (
        <div className="cont-all">
          <div className="cont-menu"><Menu /></div>
          <div className="cont-contenido">
            <Routes>
              <Route path="/" element={<ScreenPrincipal />} />
              <Route path="/login" element={<Login />} />
              <Route path="/inicio" element={<ScreenPrincipal />} />
              <Route path="/contenido/:contenedor/:casilla" element={<Contenido />} />
              <Route path="*" element={<Error404 />} />
              <Route path="/registrate" element={<Registro />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<ScreenPrincipal />} />
          <Route path="/login" element={<Login />} />
          <Route path="/inicio" element={<ScreenPrincipal />} />
          <Route path="/contenido/:contenedor/:casilla" element={<Contenido />} />
          <Route path="*" element={<Error404 />} />
          <Route path="/registrate" element={<Registro />} />
        </Routes>
      )}
    </>
  );
}

export default App;




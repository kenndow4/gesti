import {  FaSearch, FaBell } from 'react-icons/fa';
import { useState } from "react";
import "../../css/screen.principal.css";
import Add from "./add/add";
import { buscarUser } from './add/logic/buscar.user';
import InputSeach from './logicInputSeach/input.search';



const ScreenPrincipal = () => {
    const [showAdd, setShowAdd] = useState<boolean>(false);
    const [user, setUser] = useState<string>("");
    

   
   
    return ( 
        <>
        <header className="header-principal">
            <h1>Gestix Principal</h1>
            <div className="cont-search-noti-add">

            
            <div className="cont-search-principal">
                <FaSearch className='ico'/>
                <input type="search" value={user} onChange={(e)=>setUser(e.target.value)} placeholder="Encuentra a un conocido" />
            </div>
        

            <div className="cont-add-notificacion">
            <FaBell className='ico'/>
            <button onClick={() => setShowAdd(true)}>Contenedor</button>
            </div>
            </div>
            {/* se cumplira si no hay nada en el input */}
            {
                user !=="" && <InputSeach user={user}/>
            }
            {showAdd && <Add close={() => setShowAdd(false)} apiUrl="http://localhost:8080/encabezado" contenedor={true}/>}
        </header>
        <img className="caractula" src="./img/caractul.jpg" alt="" />

        <div className="cont-informacion">
            <h1>Que piensa hacer hoy {localStorage.getItem("authName")} ?</h1>
            <p className="info">hacer deberes</p>
            <p className="info">colabarar con amigos en algo</p>
            <p className="info">Organizarte con tus compañeros </p>
            <p className="info">Se te ha ocurrido alguna idea o tienes pensado algo?</p>
            <p className="info"> El tiempo es el recurso más valioso que tienes. Es el único recurso que no puedes comprar</p>
            <div className="cont-img">
                <img src="./img/colaboration.jpg" alt="" />
                <img src="./img/idea.jpg" alt="" />
                <img src="./img/colab.jpg" alt="" />
            </div>

        
        </div>
        </>

     );
}
 
export default ScreenPrincipal;
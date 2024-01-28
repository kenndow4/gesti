import { useContext, useState } from "react";
import "../../../css/add.css";
import { postContenedor } from "./logic/add";
import { ContextoContenedor } from "../../../contextAll/context";
import { buscarUser } from "./logic/buscar.user";
import Usuarios from "./usuarios/usuarios";
import { FaTimes } from "react-icons/fa";
type AddProps = {
    close: () => void;
    apiUrl:string,
    contenedor:boolean,
    idContenedor?:string
}

const Add: React.FC<AddProps> = ({ close, apiUrl, contenedor, idContenedor }) => {
    const [titulo, setTitulo]=useState<string>("");
    const [casilla, setCasilla]=useState<string>("");
    const [miembro, setMiembro]=useState<string>("");
    const [miembroSelecionado, setMiembroSelecionado]=useState<string[]>([]);
    const [error, setError]=useState<string>("");
    const [loading, setLoading]=useState<string>("");
    const [usuariosEncontrados, setUsuariosEncontrados]=useState<any>(null); 
    const [buttonContenido, setButtonContenido]=useState<string>("Crear contenedor");
    const {setDataContenedor}=useContext(ContextoContenedor);
    const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.currentTarget.id === 'overlay') {
            close();
        }
    }

    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    }

    const getMiembro = async( e: React.ChangeEvent<HTMLInputElement>)=>{
        const nuevoMiembro = e.target.value;
        setMiembro(nuevoMiembro);
        setLoading("Buscando...");
        const usuarios = await buscarUser(nuevoMiembro ,setError,nuevoMiembro);
        setLoading("");
        setUsuariosEncontrados(usuarios); // Guarda los usuarios encontrados en el estado
    };

    return ( 
        <div id="overlay" onClick={handleClose}>
            
            <div className="cont-add" onClick={handleContainerClick}>
            <div className="header">
                <h1 className="titulo-add">Crea tu contenedor</h1>
                <FaTimes className="close-icon" onClick={close} />
            </div>
                <div className="cont-contenido-add">
                {contenedor && (
    <>
        {/* <label htmlFor="titulo">Agregue el titulo</label> */}
        <input 
            type="text" 
            value={titulo} 
            onChange={(e) => setTitulo(e.target.value)} 
            id="titulo"  
            placeholder="Escribe el titulo de tu contenedor" 
        />
    </>
)}

                {/* <label htmlFor="casilla">Agregue el nombre de la casilla</label> */}
                <input type="text" value={casilla} onChange={(e)=>setCasilla(e.target.value)} id="casilla"  placeholder="Nombre de la casilla" />
                {/* <label htmlFor="titulo">Añade a los miembros</label> */}
                <input type="text" value={miembro} onChange={(e)=>getMiembro(e)}  placeholder="Añade a otros miembros" />
                <p className="error">{loading}</p>
                <div className="cont-miembros">
                {miembroSelecionado.length > 0? <p className="miembros">Miembros {miembroSelecionado.length}</p>:"" }
                </div>
               
               {/* aqui compruebo que si esta vacio erro y la variable miembro no esta vacia entonces mustrare el componenete  */}
               {error === "" && miembro !== "" && <Usuarios user={usuariosEncontrados} setMiembroSelecionado={setMiembroSelecionado} miembroSelecionado={miembroSelecionado}/>}

                <p className="error">{error}</p>
              {contenedor?
              <>
                 {titulo !== "" ?
                 <button onClick={()=>postContenedor(apiUrl,titulo,casilla,close,setError,setButtonContenido,setDataContenedor,miembroSelecionado)}>{buttonContenido}</button>
                 :
                 <button className="button-error">{buttonContenido}</button>
                 }
                </>
                :
                <>
                  {casilla !== "" ?
                <button onClick={()=>postContenedor(apiUrl,titulo,casilla,close,setError,setButtonContenido,setDataContenedor,miembroSelecionado,idContenedor)}>{buttonContenido}</button>
                :
                <button className="button-error">{buttonContenido}</button>
                }
                
                </>
              }
            </div>
            </div>
        </div>
     );
}
 
export default Add;
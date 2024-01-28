import { useContext, useState, useEffect } from "react";
import "../../../css/menu.css"
import { FaEllipsisV, FaFolder, FaFolderOpen, FaAd, FaTrash } from 'react-icons/fa';
import { NavLink } from "react-router-dom";
import { Contenedor, ContextoContenedor, Casillas } from '../../../contextAll/context';
import TresPuntos from "./trespuntos/tres.puntos";

const MenuDesplegable = () => {
    const {dataContenedor}=useContext(ContextoContenedor);

    const staticOptions = ["Personal", "Trabajo"];
    
    const options = [...staticOptions, ...(Array.isArray(dataContenedor) ? dataContenedor : [])];
    const [openMenus, setOpenMenus] = useState(Array(options.length).fill(false));
    const [estado, setEstado] = useState<boolean>(false);
    const [idContenedor, setIdContenedor] = useState<string>("");
    const [menuPosition, setMenuPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

    console.log(dataContenedor);

    const getColor = (option: string | Contenedor) => {
        let title: string="";
        if (typeof option === 'string') {
            title = option;
        } else if ('title' in option) {
            title = option.title;
        }

        if (title.toLowerCase().startsWith('p')) {
            return 'lightgreen';
        } else if (title.toLowerCase().startsWith('c')) {
            return '#DB4437';
        } else if (title.toLowerCase().startsWith('u')) {
            return '#4285F4';
        } else {
            return '#ccc'; // color por defecto
        }
    };

    const toggling = (index: number) => () => {
        const newOpenMenus = [...openMenus];
        newOpenMenus[index] = !newOpenMenus[index];
        setOpenMenus(newOpenMenus);
    };

    const tresPuntos = (option: string | Contenedor) => (event: React.MouseEvent) => {
        event.stopPropagation(); // Evita que se propague el evento de clic
        setEstado(true); // Despliega el menú
        setMenuPosition({ x: event.clientX, y: event.clientY });
        if (typeof option !== 'string') {
            setIdContenedor(option._id);
        }
    };
    

    return (  
        <>
            {options.map((option, index) => (
                <div className="dropdown" key={index}>
                    <div className="dropdown-header" onClick={toggling(index)}>
                        <div className="cont-task">
                            <div className="cont-titulo-icono">
                                {openMenus[index] ? 
                                    <FaFolderOpen style={{ fill: getColor(option) }} className="icon"/> : 
                                    <FaFolder style={{ fill: getColor(option) }} className="icon"/>
                                }
                                <h1>{typeof option === 'string' ? option : option.title}</h1>
                            </div>
                            <FaEllipsisV onClick={tresPuntos(option)} className="puntos-opcion"/>
                        </div>
                    </div>
                    {openMenus[index] && (
                        <div className="dropdown-list" >
                            {typeof option !== 'string' && option.casillas.map(casilla => (
                                <div key={casilla.titulo} onClick={() => {}}>
                                    <NavLink to={`/contenido/${option.title}/${casilla.titulo}`}># {casilla.titulo}</NavLink>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
            <TresPuntos estado={estado} setEstado={setEstado} menuPosition={menuPosition} idContenedor={idContenedor}/>
        </>
    );
}

export default MenuDesplegable;

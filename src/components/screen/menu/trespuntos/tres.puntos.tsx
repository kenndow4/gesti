import { FaAd, FaTrash} from 'react-icons/fa';

import { useEffect, useState } from "react";
import Add from '../../add/add';

interface TresPuntosProps {
    estado: boolean;
    setEstado: React.Dispatch<React.SetStateAction<boolean>>;
    menuPosition: { x: number, y: number };
    idContenedor:string;
}

const TresPuntos: React.FC<TresPuntosProps> = ({ estado, setEstado, menuPosition,idContenedor }) => {

    const [showAdd, setShowAdd] = useState<boolean>(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (estado && event.target instanceof Node && !document.querySelector('.cont-flotante-menu')?.contains(event.target)) {
                setEstado(false);
                setShowAdd(false);
            }
        };

        document.addEventListener('mouseup', handleClickOutside);
        return () => {
            document.removeEventListener('mouseup', handleClickOutside);
        };
    }, [estado, setEstado]);

    return ( 
        <>
            <h1></h1>
            {estado && (
                <div className="cont-flotante-menu" style={{ left: menuPosition.x, top: menuPosition.y}}>
                   <button className='button-opcion' onClick={() => setShowAdd(true)}> <FaAd className='ico'/> Añadir una casilla</button>
                   {showAdd && <Add close={() => setShowAdd(false)} apiUrl="http://localhost:8080/addcasilla" contenedor={false} idContenedor={idContenedor}/>}
                   <button className='button-opcion'><FaTrash className='ico'/> Eliminar Contenedor</button>
                </div>
            )}
        </>
     );
}
 
export default TresPuntos;

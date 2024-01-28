
import { Link } from "react-router-dom";

type PropsDireccion={
    llamado:string,
    enlace:string,
    mandato:string
}

const NavLogin:React.FC<PropsDireccion> = ({llamado,enlace,mandato}) => {
    return ( 
        // <p className="cuenta">{llamado} <NavLink to={enlace}>{mandato}</NavLink></p>
        <p className="cuenta">{llamado} <Link to={enlace}>{mandato}</Link></p>
        
     );
}
 
export default NavLogin;
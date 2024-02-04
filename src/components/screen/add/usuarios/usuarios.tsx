import { FaCheckSquare, FaRegCheckSquare} from 'react-icons/fa';

interface User{
    _id:string
    perfil:string,
    nombre:string,
    email:string,
};
interface Userpara {
    user:User[]
    setMiembroSelecionado: React.Dispatch<React.SetStateAction<string[]>>,
    miembroSelecionado:string[]
};

const Usuarios:React.FC<Userpara> = ({user, setMiembroSelecionado, miembroSelecionado}) => {
    
    const getSelectUser=(userId:string)=>{
       if(!miembroSelecionado.includes(userId)){

           setMiembroSelecionado([...miembroSelecionado, userId]);
       }else{
        setMiembroSelecionado(miembroSelecionado.filter(id => id !== userId));
       }
        
    };

    return (  
        <div className="cont-usuarios">

           {user && user.map((usuario)=>{
            const imageUrl = usuario.perfil.includes('http://') || usuario.perfil.includes('https://') 
                ? usuario.perfil 
                : `http://localhost:8080/perfil/${usuario.perfil}`;

            return(
                <div className="cont-usuario-select" onClick={()=>getSelectUser(usuario._id)}>
               <div className="cont-usuario">
                <img src={imageUrl} alt="" />
                <div className="cont-nombre-email">

                <p className="usuario-nombre">{usuario.nombre}</p>
                <p className="usuario-email">{usuario.email}</p>
                </div>
               </div>
               {miembroSelecionado.includes(usuario._id) ? <FaCheckSquare className='select' style={{fill:"#1DB954"}} /> : <FaRegCheckSquare className='select' />}
               </div>
            );
           })

           }
        </div>
    );
}
 
export default Usuarios;

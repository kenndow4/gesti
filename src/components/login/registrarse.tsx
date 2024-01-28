import "../../css/login.css"
import NavLogin from "./navLogin";
import { useEffect } from "react";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";


import { useState } from "react";
import { ValidarRegistro,onSuccess,onFailure } from "./api/registro";



// import FacebookLogin from 'react-facebook-login';

const Registro = () => {

    const clientId:string = "1098369815723-9n9krhj5bb9dro0k0pf57lv3c9cch66u.apps.googleusercontent.com";
    const [nombre, setNombre]=useState<string>("");
    const [email, setEmail]=useState<string>("");
    const [password, setPassword]=useState<string>("");
    const [confirPassword, setConfirPassword]=useState<string>("");
    const [error, setError]= useState<string>("");
    const [loading, setLoading]= useState<string>("Registrarse");
    const [nombreError, setNombreError] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [confirPasswordError, setConfirPasswordError] = useState<boolean>(false);
 
    useEffect(()=>{
   
      const start = ()=>{
         gapi.auth2.init({
             clientId:clientId,
         })
      }
 
      gapi.load("client:auth2", start);
 
     },[]);
   
    
    return ( 
        <>
        <form action="" className="cont-login" onSubmit={(e)=>ValidarRegistro(e,nombre,email,password, confirPassword,setError,setLoading,setNombreError,setEmailError,setPasswordError,setConfirPasswordError)}>

            
        <h1>Crea tu cuenta de Gestix</h1>
        <input type="text" name="nombre" onChange={(e)=>setNombre(e.target.value)} className={nombreError ? "input-error" : ""}   value={nombre}  placeholder="Introduce tu nombre"  />
        <input type="email" name="email" onChange={(e)=>setEmail(e.target.value)} className={emailError ? "input-error" : ""}  value={email} placeholder="Introduce un email"  />
        <input type="password" name="pass" onChange={(e)=>setPassword(e.target.value)} className={passwordError ? "input-error" : ""}  value={password} placeholder="Introduce una contraseña" />
        <input type="password" name="confirpass" onChange={(e)=>setConfirPassword(e.target.value)} className={confirPasswordError ? "input-error" : ""} value={confirPassword}  placeholder="Repite la contraseña" />
        
        {/* aqui va la parte del error cuando el campo este vacio o tenga algo invalido */}
        <p className="error">{error}</p>
        
        <button type="submit" className="submit" >{loading}</button>
        <p className="o">O</p>
       
        
        <div className="cont-google">
        <GoogleLogin
        className="login-google"
        clientId={clientId}
        onSuccess={(e)=>onSuccess(e,setError)}
        onFailure={onFailure}
        cookiePolicy={"single_host_policy"}
        render={renderProps => (
            <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="login-google">
                <img src="https://th.bing.com/th/id/OIP.Din44az7iZZDfbsrD1kfGQHaHa?w=169&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="" />
              Iniciar sesión con Google
            </button>
          )}
        
        />

        </div>
       
    </form>
   
 
          <NavLogin llamado="¿Ya tienes una cuenta?" enlace="/login" mandato="Inicia sesión."/>
    <p className="politica">Al hacer clic en "Continuar arriba, reconoces que leíste, comprendiste y aceptas los terminos y condiciones de Timer.</p>
     </>
     
     );
}
 
export default Registro;
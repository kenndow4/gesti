import { useEffect, useState } from "react";
import "../../css/login.css"
import NavLogin from "./navLogin";
import { login, onFailure, onSuccess } from "./api/login";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";





const Login = () => {
  
   const clientId:string = "1098369815723-9n9krhj5bb9dro0k0pf57lv3c9cch66u.apps.googleusercontent.com";
   const [email, setEmail]=useState<string>("");
   const [password, setPassword]=useState<string>("");
   const [error, setError]=useState<string>("");
   const [loading, setLoading]=useState<string>("Iniciar sesión");
   const [emailError, setEmailError]=useState<boolean>(false);
   const [passwordError, setPasswordError]=useState<boolean>(false);
   
   
   useEffect(()=>{
   
    const start = ()=>{
       gapi.auth2.init({
           clientId:clientId,
       })
    }

    gapi.load("client:auth2", start);

   },[]);
 

   


    return ( 
        <div>
        <form action="" className="cont-login" onSubmit={(e)=>login(e,email,password,setError,setLoading,setEmailError,setPasswordError)}>
            <h1>Iniciar sesión en Gestix</h1>
            <input type="email" name="" value={email} className={emailError ? "input-error" : ""} onChange={(e)=>setEmail(e.target.value)} placeholder="Introduce tu email" id="" />
            <input type="password" name="" value={password} className={passwordError ? "input-error" : ""} onChange={(e)=>setPassword(e.target.value)} placeholder="Introduce tu contraseña" id="" />
           
           {/* aqui va la parte del error cuando el campo este vacio o tenga algo invalido */}
        <p className="error">{error}</p>
            <button type="submit" className="submit">{loading}</button>
            
            
            <p className="o">O</p>
           {/* esta es la parte del registro con google */}
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

        
            
            <NavLogin llamado="¿Acabas de llegar? " enlace="/registrate" mandato="Regístrate"/>
            </div>
     );
}
 
export default Login;
import { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { getSession } from "./conexion.api.login";


export const login = async(
    e:React.FormEvent<HTMLFormElement>,
    email:string,
    password:string,
    setError:React.Dispatch<React.SetStateAction<string>>,
    setLoading:React.Dispatch<React.SetStateAction<string>>,
    setEmailError:React.Dispatch<React.SetStateAction<boolean>>,
    setPasswordError:React.Dispatch<React.SetStateAction<boolean>>,
)=>{
    e.preventDefault();
    let error:boolean = false;
    if(email.trim() === ""){
       setEmailError(true);
       setError("Hay campos vacio");
       error=true;
    }else{
        setEmailError(false);
        error=false;

    }
    if(password.trim() === ""){
       setPasswordError(true);
       setError("Hay campos vacio");
       error=true;
    }else{
        setPasswordError(false);
        error=false;

    }

    // si no hay error entonces llamamos a la api

    if(!error){
        setError("");
        setLoading("Cargando...");
        await getSession(email,password,setError,setLoading);

    };
}; 




// esta parte es de autenticacion con google 
export const onSuccess = async(resp: GoogleLoginResponse | GoogleLoginResponseOffline, setError: React.Dispatch<React.SetStateAction<string>>)=>{
    if ('profileObj' in resp) {
        const user = resp.profileObj;
        console.log(user);
        await getSession(user.email,user.googleId,setError);
    }

   }
  export const onFailure = ()=>{

    console.log("salio mal");

}
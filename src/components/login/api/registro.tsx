import { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { senDataApi } from "./conexion.api.registro";




export const ValidarRegistro = async(
    e:React.FormEvent<HTMLFormElement>,
    nombre:string,
    email:string,
    password:string,
    confirPassword:string,
    setError: React.Dispatch<React.SetStateAction<string>>,
    setLoading:React.Dispatch<React.SetStateAction<string>>,
    setNombreError: React.Dispatch<React.SetStateAction<boolean>>,
    setEmailError: React.Dispatch<React.SetStateAction<boolean>>,
    setPasswordError: React.Dispatch<React.SetStateAction<boolean>>,
    setConfirPasswordError: React.Dispatch<React.SetStateAction<boolean>>,
)=>{

 e.preventDefault();
 let error:boolean = false;
 let errorPassword:boolean = false;
 if(nombre.trim() === "") {
    setNombreError(true);
    error = true;
  }else{
    setNombreError(false);
    error = false;

  }
  if(email.trim() === "") {
    setEmailError(true);
    error = true;
  }else{
    setEmailError(false);
    error = false;

  }
  if(password.trim() === "") {
    setPasswordError(true);
    error = true;
  }else{
    setPasswordError(false);
    error = false;

  }
  if(confirPassword.trim() === "") {
    setConfirPasswordError(true);
    error = true;
  }else{
    setConfirPasswordError(false);
    error = false;

  }
  if(password !== confirPassword){
    
    errorPassword = true;
  }
  else{
   
        setError("");
        errorPassword=false;
    
  }
  if(error) {
    setError("Por favor, rellena todos los campos.");
  }else if(errorPassword){
    setError("las contraseñas deben de ser iguales");
  }else if(password.length < 8){
    setError("las contraseña debe de tener almenos 8 caracteres");

  }
  else{
    setError("");
    // aqui vamos a conectarnos a la api
    setLoading("cargando...");
    await senDataApi(nombre, email,password,"user.webp",setError,setLoading);
    
  }

};


// esta parte es de autenticacion con google 
export const onSuccess = async(resp: GoogleLoginResponse | GoogleLoginResponseOffline, setError: React.Dispatch<React.SetStateAction<string>>)=>{
    if ('profileObj' in resp) {
        const user = resp.profileObj;
        console.log(user);
        await senDataApi(user.name,user.email,user.googleId,user.imageUrl,setError);
    }

   }
  export const onFailure = ()=>{

    console.log("salio mal");

}




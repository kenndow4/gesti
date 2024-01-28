
export const senDataApi=async(
    nombre:string,
    email:string,
    password:string,
    perfil:string,
    setError: React.Dispatch<React.SetStateAction<string>>,
    setLoading?:React.Dispatch<React.SetStateAction<string>>,

)=>{
    try{

        const response = await fetch("http://localhost:8080/registro",{
            method: 'POST', // o 'PUT' si estás actualizando un recurso existente
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, email,password,perfil }) // convierte tus datos a JSON

        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.token) {
            // Guarda el token en el localStorage
            console.log("ok");
            localStorage.setItem("authToken",data.token);
            localStorage.setItem("authPerfil",data.user.perfil);
            localStorage.setItem("authName",data.user.name);
            window.location.href = "/inicio";
        }
        if(setLoading){

            setLoading("Registrarse");
        }
         if(data.error){
            setError(data.error);

         }

    }catch(err){
        if(setLoading){

            setLoading("Registrarse");
        }
        setError("Lo sentimos pero tuvimos problema con el servidor");
    }

};


// aqui vamos a conectarnos a la api a ver si el usuario existe
export const getSession=async(email:string, password:string ,  setError:React.Dispatch<React.SetStateAction<string>>,setLoading?:React.Dispatch<React.SetStateAction<string>>)=>{
    const token: string | null = localStorage.getItem("token");
    try {
        const response = await fetch("http://localhost:8080/login", {
            method: 'POST', // o 'PUT' si estás actualizando un recurso existente
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify({ email,password}) // convierte tus datos a JSON

           
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        if(data.error){
            setError(data.error);
            if(setLoading){

                setLoading("Iniciar sesión");
            }

        }
        if(data.data){
            setError("");
            localStorage.setItem("authToken",data.token);
            localStorage.setItem("authPerfil",data.perfil);
            localStorage.setItem("authName",data.name);
            window.location.href = "/inicio";
            if(setLoading){

                setLoading("Iniciar sesión");
            }
            
        }
       
        
    } catch (error) {
        if(setLoading){

            setLoading("Iniciar sesión");
        }
        setError("Lo siente pero hemos tenido problema con el servidor" );
    }

};
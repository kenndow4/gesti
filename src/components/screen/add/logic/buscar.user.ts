

export const  buscarUser=async(
    user:string,
    setError:React.Dispatch<React.SetStateAction<string>>,
   
     miembro:string
     )=>{
        const token = localStorage.getItem('authToken');
        if(user.trim()!==""){

            try{
                 setError("");
        const response = await fetch(`http://localhost:8080/getuser?user=${encodeURIComponent(user)}`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
        });
    
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const respuesta = await response.json();
        console.log(respuesta);
        if(respuesta.length <1){
           
            setError("No hemos encontrado un usuario con el nombre "+ miembro );
        }else{
            
            setError("");
        return respuesta;
        }
       }catch(err){
        
        setError("Hemos tenido problema con el servidor intentelo mas tarde");
       }
        }

};
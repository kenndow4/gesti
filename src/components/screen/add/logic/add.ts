import { Contenedor } from "../../../../contextAll/context";


export const postContenedor = async(
    apiUrl:string,
    titulo:string, 
    casilla:string, 
    close:()=> void, 
    setError:React.Dispatch<React.SetStateAction<string>>,
    setButtonContenido:React.Dispatch<React.SetStateAction<string>>,
    setDataContenedor:React.Dispatch<React.SetStateAction<Contenedor[]>>,
    miembroSelecionado:string[],
    idContenedor?:string
    )=>{

    const token = localStorage.getItem('authToken');
    setButtonContenido("Cargando...");
    
    // esto es comprobando para saber si es agregando un contenedor o una casilla 

    if(!idContenedor){

        if(titulo.trim() === ""){
            titulo = "wfnt";
            try{
                const response = await fetch(apiUrl, {
                    method: 'POST', // o 'PUT' si estás actualizando un recurso existente
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` 
                        
                    },
                    body: JSON.stringify({ titulo,miembroSelecionado,casilla}) // convierte tus datos a JSON
        
                   
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                const respuesta = await response.json();
                if(!respuesta.error){
    
                    console.log(respuesta);
                    setDataContenedor(respuesta);
                    setButtonContenido("Crear contenidor");
                    close();
                }else{
                    setButtonContenido("Crear contenidor");
                    setError(respuesta.error);
                }
    
            }catch(err){
                setError("Tuvimos un error por favor intente de nuevo");
                setButtonContenido("Crear contenido");
            }
    
        }else{
           
            try{
                const response = await fetch(apiUrl, {
                    method: 'POST', // o 'PUT' si estás actualizando un recurso existente
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` 
                        
                    },
                    body: JSON.stringify({ titulo,miembroSelecionado,casilla}) // convierte tus datos a JSON
        
                   
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                const respuesta = await response.json();
               
                if(!respuesta.error){
    
                    console.log(respuesta);
                    setDataContenedor(respuesta);
                    setButtonContenido("Crear contenidor");
                    close();
                }else{
                    setButtonContenido("Crear contenidor");
                    setError(respuesta.error);
                }
    
    
            }catch(err){
                setError("Tuvimos un error por favor intente de nuevo");
                setButtonContenido("Crear contenido");
            }
    
        }

    }else{

        try{

            const response = await fetch(apiUrl, {
                method: 'POST', // o 'PUT' si estás actualizando un recurso existente
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                    
                },
                body: JSON.stringify({ idContenedor,casilla}) // convierte tus datos a JSON
    
               
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const respuesta = await response.json();

            if(!respuesta.error){
    
                console.log(respuesta);
                setDataContenedor(respuesta);
                setButtonContenido("Crear contenidor");
                close();
            }else{
                setButtonContenido("Crear contenidor");
                setError(respuesta.error);
            }


        }catch(err){

            setError("Tuvimos un error por favor intente de nuevo");
            setButtonContenido("Crear contenido");

        }

    }

}
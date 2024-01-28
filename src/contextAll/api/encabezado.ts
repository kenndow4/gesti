

export const getEncabezado= async()=>{
    const token = localStorage.getItem('authToken');
    try{
        const response = await fetch("http://localhost:8080/getencabezado",{
            method: 'GET', // o 'PUT' si estás actualizando un recurso existente
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
                
            },
        });
        const result= await response.json();
       return result;

    }catch(err){
        console.log(err);
    }
}
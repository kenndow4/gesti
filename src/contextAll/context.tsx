import React, { ReactNode, useEffect, useState } from "react";
import { getEncabezado } from "./api/encabezado";


export interface Casillas{
    titulo:string
}
export interface Contenedor{
    title:string,
    author:string,
    permisos:string[],
    casillas:Casillas[],
    _id:string
}

interface TituloContenedor{
    dataContenedor:Contenedor[],
    setDataContenedor:React.Dispatch<React.SetStateAction<Contenedor[]>>
}

const ContextoContenedor = React.createContext<TituloContenedor>({

    dataContenedor:[],
    setDataContenedor:()=>{}
       
});

const ContContenido = ({children}:{children:ReactNode}) => {

   const [dataContenedor, setDataContenedor]=useState<Contenedor[]>([]);
   useEffect(() => {
    const fetchData = async () => {
        const result = await getEncabezado();
        
        setDataContenedor(result);
    }

    fetchData();
}, []);


    return ( 

        <ContextoContenedor.Provider value={{dataContenedor,setDataContenedor}}>
            {children}

        </ContextoContenedor.Provider>

     );
}

export {ContContenido, ContextoContenedor};
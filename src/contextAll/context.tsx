import React, { ReactNode, useEffect, useState } from "react";
import { getEncabezado } from "./api/encabezado";
import { ThemeContext, useTheme } from "./theme";



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
   const { theme, toggleTheme } = useTheme();
   useEffect(() => {
    const fetchData = async () => {
        const result = await getEncabezado();
        
        setDataContenedor(result);
    }

    fetchData();
}, []);


    return ( 

        <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ContextoContenedor.Provider value={{dataContenedor,setDataContenedor}}>
            {children}

        </ContextoContenedor.Provider>
        </ThemeContext.Provider>
     );
}

export {ContContenido, ContextoContenedor};
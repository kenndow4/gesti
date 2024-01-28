import React, { useState, useEffect } from "react";
import { buscarUser } from "../add/logic/buscar.user";
import "../../../css/inputSearch.css";

interface InputProps {
  user: string;
}

interface User {
  _id: string;
  perfil: string;
  nombre: string;
  email: string;
}

export const InputSeach: React.FC<InputProps> = ({ user }) => {
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<string>("");

  useEffect(() => {
    const getMiembro = async () => {
      setLoading("Buscando...");
      try {
        const usuarios = await buscarUser(user, setError, user);
        setData(usuarios);
      } catch (error) {
        setError("Error al buscar usuarios");
      } finally {
        setLoading("");
      }
    };

    getMiembro();
  }, [user]);

  return (
   
<div className="search-results">
    {loading === "" ? (
      <>
        {data && data.length > 0 ? (
          data.slice(0, 5).map((usuario) => {
            const imageUrl = usuario.perfil.includes('http://') || usuario.perfil.includes('https://') 
              ? usuario.perfil 
              : `http://localhost:8080/perfil/${usuario.perfil}`;
    
            return (
              <div key={usuario._id} className="result-item">
                <img src={imageUrl} alt={`Perfil de ${usuario.nombre}`} />
                <div className="user-details">
                  <p className="user-name">{usuario.nombre}</p>
                  <p className="user-email">{usuario.email}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="no-results">No se encontraron usuarios</p>
        )}
      </>
    ) : (
      <p className="carga-error">{loading}</p>
    )}
  </div>
  );
};

export default InputSeach;


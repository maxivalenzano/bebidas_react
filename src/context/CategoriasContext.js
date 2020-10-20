import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

//Creando el Context 

export const CategoriasContext = createContext();

//Provider es donde se encuntran las funciones y state
const CategoriasProvider = (props) => {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const obtenerCategorias = async () => {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;
            const categorias = await axios.get(url);

            setCategorias(categorias.data.drinks);
        };
        obtenerCategorias();
    }, [])

    return(
        <CategoriasContext.Provider
            value ={{
                categorias
            }}
        >
            {props.children}
        </CategoriasContext.Provider>
    )

}
export default CategoriasProvider;
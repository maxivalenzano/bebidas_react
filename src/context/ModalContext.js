import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

//crear el contexxt
export const ModalContext = createContext();

const ModalProvider = (props) => {

    //state del Provider
    const [idreceta, guardarIdReceta] = useState(null);
    const [receta, guardarReceta] = useState({})

    //llamar a la api con el ID de la receta

    useEffect( () => {
        const obtenerReceta = async () => {
            if(!idreceta) return;

            const url=`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`
            const response = await axios.get(url);
            guardarReceta(response.data.drinks[0])
        }
        obtenerReceta();
    }, [idreceta])
    
    return ( 
        <ModalContext.Provider
            value={{
                guardarIdReceta
            }}
        >
            {props.children}
        </ModalContext.Provider>
     );
}
 
export default ModalProvider;
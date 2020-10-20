import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

//crear el contexxt
export const ModalContext = createContext();

const ModalProvider = (props) => {

    //state del Provider
    const [idreceta, guardarIdReceta] = useState(null);
    
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
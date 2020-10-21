import React, {useContext, useState} from 'react';
import Error from '../components/Error';
import {CategoriasContext} from '../context/CategoriasContext';
import {RecetasContext} from '../context/RecetasContext';

const Formulario = () => {

    const [busqueda, setBusqueda] = useState({
        nombre:'',
        categoria:''
    });

    const {categorias} = useContext(CategoriasContext);
    const { buscarRecetas, guardarConsultar } = useContext(RecetasContext);
    
    //funcion para leer los contenidos
    const obtenerDatosReceta = e => {
        setBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        })
    }
    const [error, setError] = useState(false);
        return ( 
            <form
                className="col-12"
                onSubmit={e => {
                    e.preventDefault();
                    if(busqueda.nombre === '' || busqueda.categoria === ''){
                        setError(true);
                        return null;
                    };
                    setError(false);
                    buscarRecetas(busqueda)
                    guardarConsultar(true)
                }}
            >
                {error ? <Error mensaje= 'Todos los campos son obligatorios' /> : null}
                <fieldset className="text-center">
                    <legend>Busca bebidas por categorias o ingredientes</legend>
                </fieldset>

                <div className="row mt-4">
                    <div className="col-md-4">
                        <input 
                            name="nombre"
                            className="form-control"
                            type="text"
                            placeholder="Buscar por ingredientes"
                            onChange={obtenerDatosReceta}
                        />
                    </div>
                    <div className="col-md-4">
                        <select
                            className="form-control"
                            name="categoria"
                            onChange={obtenerDatosReceta}
                        >
                            <option value="">--Seleccionar Categoria--</option>
                            {categorias.map(categoria =>(
                                <option
                                    key={categoria.strCategory}
                                    value={categoria.strCategory}
                                >
                                    {categoria.strCategory}
                                </option>
                                

                            ))}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <input 
                            type="submit"
                            className="btn btn-block btn-primary"
                            value="Buscar Bebidas"
                        />
                    </div>
                </div>
            </form>
     );
}
 
export default Formulario;
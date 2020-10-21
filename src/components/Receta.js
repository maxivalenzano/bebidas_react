import React, {useContext, useState} from 'react'
import {ModalContext} from '../context/ModalContext';

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: '100%',
        maxWidth: 500,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        overflow: 'scroll',
        height: '100%',
        maxHeight: 800,
        display: 'block'
        },
    header: {
        padding: '12px 0',
        borderBottom: '1px solid darkgrey'
        },
    content: {
        padding: "12px 0",
        overflow: 'scroll'
        }
}));

const Receta = ({receta}) => {

    //configuracion del modal de material-ui
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    
    const {inforeceta, guardarReceta, guardarIdReceta} = useContext(ModalContext);

    const mostrarIngredientes = (inforeceta) => {
        let ingredientes = [];
        for(let i = 1; i <16; i++){
            if( inforeceta[`strIngredient${i}`]) {
                ingredientes.push(
                    <li>
                        {inforeceta[`strIngredient${i}`]} {inforeceta[`strMeasure${i}`]}
                    </li>
                )
            }
        }
        return ingredientes;
    }

    return ( 
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">{receta.strDrink}</h2>

                <img className="card-img-top" src={receta.strDrinkThumb} alt={`Imagen de ${receta.strDrink}`} />

                <div className="card-body">
                    <button
                        type="button" 
                        className="btn btn-block btn-primary"
                        onClick={() => {
                            guardarIdReceta(receta.idDrink)
                            handleOpen();
                        }}
                    >Ver Receta</button>
                    <Modal
                        open={open}
                        onClose={() => {
                            guardarIdReceta(null)
                            guardarReceta({})
                            handleClose();
                        }}
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <h2>{inforeceta.strDrink}</h2>
                            <h3 className="mt-4">Instrucciones</h3>
                            <p>{inforeceta.strInstructions} </p>
                            <img className="img-fluid my-4"src={inforeceta.strDrinkThumb} alt="Imagen del trago"/>
                            <h3>Ingredientes y cantidades</h3>
                            <ul>
                                {mostrarIngredientes(inforeceta)}
                            </ul>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
     );
}
 
export default Receta;
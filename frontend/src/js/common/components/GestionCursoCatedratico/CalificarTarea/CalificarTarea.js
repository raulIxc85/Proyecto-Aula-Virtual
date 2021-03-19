import React, { Component } from 'react';
import Formulario from './Formulario';

class CalificarTarea extends Component{
    
    render(){
        const { calificarTarea, obtenerNota, match } = this.props;
        console.log(match);
        const idTarea = match.params.id_tarea;
        if (idTarea){
            obtenerNota(idTarea);
        }

        return(
            <Formulario
                onSubmit={calificarTarea}
            />
        );
    }
}

export default CalificarTarea;
import React, { Component } from 'react';
import Formulario from './Formulario';

class CalificarTarea extends Component{
    
    render(){
        const { calificarTarea } = this.props;
        
        return(
            <Formulario
                onSubmit={calificarTarea}
            />
        );
    }
}

export default CalificarTarea;
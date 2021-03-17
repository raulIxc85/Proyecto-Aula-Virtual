import React, { Component } from 'react';
import Formulario from './Formulario';

class EventoCrear extends Component{
    state = {
        crearE: true,
    }
    componentWillMount = () => {
        const { leer, match } = this.props;
        const id = match.params.id;
        if (id){
            this.setState({crearE: false});
            leer(id);
        }
    }
    render(){
        const { crearEvento, modificarEvento } = this.props;
        const { crearE } = this.state;
        const funcionEnvio = crearE ? crearEvento : modificarEvento;
        return(
            <Formulario
                crearE = { crearE }
                onSubmit={ funcionEnvio }
            />
        )
    }
}

export default EventoCrear;
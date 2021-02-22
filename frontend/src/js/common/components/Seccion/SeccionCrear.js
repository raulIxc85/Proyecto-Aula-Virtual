import React, { Component } from 'react';
import Formulario from './Formulario';

class Seccion extends Component{
    state = {
        crear: true,
    }
    componentWillMount = () => {
        const { leer, match } = this.props;
        const id = match.params.id;
        if (id){
            this.setState({crear: false});
            leer(id);
        }
    }
    render(){
        const { registroSeccion, modificarSeccion } = this.props;
        const { crear } = this.state;
        const funcionEnvio = crear ? registroSeccion : modificarSeccion;
        return(
            <Formulario
                crear = { crear }
                onSubmit={ funcionEnvio }
            />
        )
    }
}

export default Seccion;
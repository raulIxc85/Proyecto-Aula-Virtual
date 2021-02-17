import React, { Component } from 'react';
import Formulario from './Formulario';

class Profesion extends Component{
    state={
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
        const { registroProfesion, modificarProfesion } = this.props;
        const { crear } = this.state;
        
        const funcionEnvio = crear ? registroProfesion : modificarProfesion;
        
        return(
            <Formulario
                crear = {crear} 
                onSubmit={funcionEnvio}
            />
        );
    }
}

export default Profesion;
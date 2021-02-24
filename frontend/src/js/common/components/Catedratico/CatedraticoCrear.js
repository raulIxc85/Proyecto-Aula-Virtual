import React, { Component } from 'react';
import Formulario from './Formulario';

class Catedratico extends Component{
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
        const { registroCatedratico, modificarCatedratico, listarProfesiones } = this.props;
        const { crear } = this.state;
        const funcionEnvio = crear ? registroCatedratico : modificarCatedratico;
       
        return(
            <Formulario
                crear = {crear} 
                listarProfesiones = {listarProfesiones}
                onSubmit={funcionEnvio}
            />
            
        );
    }
}

export default Catedratico;
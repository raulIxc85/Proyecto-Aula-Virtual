import React, { Component } from 'react';
import Formulario from './Formulario';

class Grado extends Component{
    state={
        crear: true,
    }
    componentWillMount = () => {
        const { leer, match, listarNiveles } = this.props;
        console.log(this.props);
        const id = match.params.id;
        if (id){
            this.setState({crear: false});
            leer(id);
        }
        listarNiveles();
    }
    render(){
        const { registroGrado, modificarGrado, listarNiveles } = this.props;
        const { crear } = this.state;
        const funcionEnvio = crear ? registroGrado : modificarGrado;
        
        return(
            <Formulario
                crear = {crear} 
                listarNiveles = {listarNiveles}
                onSubmit={funcionEnvio}
            />
        );
    }
}

export default Grado;
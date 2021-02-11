import React, { Component } from 'react';
import Formulario from './Formulario';

class Rol extends Component{
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
        console.log("PROPS: ", this.props);
        const { registroRol, modificarRol } = this.props;
        const { crear } = this.state;
        
        const funcionEnvio = crear ? registroRol : modificarRol;
        
        return(
            <Formulario
                crear = {crear} 
                onSubmit={funcionEnvio}
            />
        );
    }
}

export default Rol;
import React, { Component } from 'react';
import { listarProfesiones } from '../../../redux/modules/catedratico/catedratico';
import Formulario from './Formulario';

class Catedratico extends Component{
    state={
        crear: true,
    }
    componentWillMount = () => {
        const { leer, match, listarProfesiones } = this.props;
        const id = match.params.id;
        if (id){
            this.setState({crear: false});
            leer(id);
        }
        listarProfesiones();
        
    }
    render(){
        console.log("PROPS: ", this.props);
        const { registroCatedratico, modificarCatedratico, lecturaProfesion } = this.props;
        const { crear } = this.state;
        const  profesion  = lecturaProfesion;
        const funcionEnvio = crear ? registroCatedratico : modificarCatedratico;
       
        return(
            <Formulario
                crear = {crear} 
                profesion = {profesion}
                onSubmit={funcionEnvio}
            />
            
        );
    }
}

export default Catedratico;
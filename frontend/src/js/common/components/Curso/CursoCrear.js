import React, { Component } from 'react';
import Formulario from './Formulario';

class Curso extends Component{
    state = {
        crearCurso: true,
    }
    componentWillMount = () => {
        const { leer, match } = this.props;
        const id = match.params.id;
        if (id){
            this.setState({crearCurso: false});
            leer(id);
        }
    }
    render(){
        const { crear, editar } = this.props;
        const { crearCurso } = this.state;
        const funcionEnvio = crearCurso ? crear : editar;
        return(
            <Formulario
                crearCurso = { crearCurso }
                onSubmit={ funcionEnvio }
            />
        )
    }
}

export default Curso;
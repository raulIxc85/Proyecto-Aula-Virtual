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
        const { crear, modificarCurso } = this.props;
        const { crearCurso } = this.state;
        const funcionEnvio = crearCurso ? crear : modificarCurso;
        return(
            <Formulario
                crearCurso = { crearCurso }
                onSubmit={ funcionEnvio }
            />
        )
    }
}

export default Curso;
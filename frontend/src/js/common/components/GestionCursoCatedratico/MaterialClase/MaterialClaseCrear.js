import React, { Component } from 'react';
import Formulario from './Formulario';

class MaterialClaseCrear extends Component{
    state={
        crear: true,
    }
    componentWillMount = () => {
        const { leerAsignacion, match } = this.props;
        //const ver = window.location.href.includes('ver-tarea');
        //const editar = window.location.href.includes('editar');
        const id = match.params.id;
        if (id){
            leerAsignacion(id);
        }
    }

    render(){
        const { registroMaterial, editar } = this.props;
        const { crear } = this.state;
        const funcion = crear ? registroMaterial : editar;
        return(
            <Formulario
                onSubmit={funcion}
                crear = {crear}
            />
        );
    }
}

export default MaterialClaseCrear;
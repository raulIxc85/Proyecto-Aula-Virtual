import React, { Component } from 'react';
import Formulario from './Formulario';

class AsignacionCrear extends Component{
    state={
        crear: true,
    }
    componentWillMount = () => {
        const { leerAsignacion, match } = this.props;
        const id = match.params.id;
        if (id){
            this.setState({crear: false});
            leerAsignacion(id);
        }
    }
    render(){
        const { 
            registroAsignacion, 
            obtenerCatedraticos,
            obtenerCursos,
            obtenerGrados,
            obtenerSecciones
        } = this.props;
        const { crear } = this.state;
        
        return(
            <Formulario
                crear = {crear} 
                obtenerCatedraticos = {obtenerCatedraticos}
                obtenerCursos = {obtenerCursos}
                obtenerGrados = {obtenerGrados}
                obtenerSecciones = {obtenerSecciones}
                onSubmit={registroAsignacion}
            />
        );
    }
}

export default AsignacionCrear;
import React, { Component } from 'react';
import Formulario from './Formulario';

class TareaCrear extends Component{
    state={
        crear: true,
    }
    componentWillMount = () => {
        const { leerAsignacion, match, leer, sumarNota } = this.props;
        const ver = window.location.href.includes('ver-tarea');
        const editar = window.location.href.includes('editar');
        if (ver || editar){
            const idTarea = match.params.id_tarea;
            if (idTarea){
                this.setState({crear: false});
                leer(idTarea);
            } 
        }else{
            const id = match.params.id;
            if (id){
                leerAsignacion(id);
                sumarNota(id);
            }
        }
    }

    render(){
        const { registroTarea, editarTarea, match } = this.props;
        const { crear } = this.state;
        const id_asignacion = match.params.id
        const funcion = crear ? registroTarea : editarTarea;
        return(
            <Formulario
                onSubmit={funcion}
                crear = {crear}
                id_asignacion = {id_asignacion} 
            />
        );
    }
}

export default TareaCrear;
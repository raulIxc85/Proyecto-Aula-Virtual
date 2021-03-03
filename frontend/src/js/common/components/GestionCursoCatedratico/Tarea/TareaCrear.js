import React, { Component } from 'react';
import Formulario from './Formulario';

class TareaCrear extends Component{
    state={
        crear: true,
    }
    componentWillMount = () => {
        const { leerAsignacion, match, leer } = this.props;
        const ver = window.location.href.includes('ver-tarea');
        const editar = window.location.href.includes('editar');
        if (ver || editar){
            const id = match.params.id;
            if (id){
                this.setState({crear: false});
                leer(id);
            }
        }else{
            const id = match.params.id;
            if (id){
                
                leerAsignacion(id);
            }
        }
        
        
    }
    render(){
        const { registroTarea, editarTarea } = this.props;
        console.log(this.props);
        const { crear } = this.state;
        const funcion = crear ? registroTarea : editarTarea;
        return(
            <Formulario
                onSubmit={funcion}
                crear = {crear}
            />
        );
    }
}

export default TareaCrear;
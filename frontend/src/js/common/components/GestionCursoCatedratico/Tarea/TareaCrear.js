import React, { Component } from 'react';
import Formulario from './Formulario';

class TareaCrear extends Component{
    state={
        crear: true,
        archivo: null,
    }
    componentWillMount = () => {
        const { match, leer, sumarNota } = this.props;
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
                sumarNota(id);
            }
        }
    }

    setArchivo = (archivo) => {
        this.setState({ archivo });
    };

    registro = (data) => {
        const { registroTarea, archivo } = this.props;
        registroTarea( {...data, archivo: null},
        [{ file: this.state.archivo, name: 'archivo' },])
    }

    actualizar = (data) => {
        const { editarTarea, archivo } = this.props;
        editarTarea( {...data, archivo: null},
        [{ file: this.state.archivo, name: 'archivo' },])
    }

    render(){
        const { match, archivo, borrarArchivo } = this.props;
        const { crear } = this.state;
        const id_asignacion = match.params.id;
        const funcionEnvio = crear ? this.registro : this.actualizar;
        return(
            <React.Fragment>
                <Formulario
                    onSubmit={funcionEnvio}
                    crear = {crear}
                    id_asignacion = {id_asignacion} 
                    setArchivo = {this.setArchivo}
                    archivo = {archivo}
                    borrarArchivo = {borrarArchivo}
                />
            </React.Fragment>
        );
    }
}

export default TareaCrear;
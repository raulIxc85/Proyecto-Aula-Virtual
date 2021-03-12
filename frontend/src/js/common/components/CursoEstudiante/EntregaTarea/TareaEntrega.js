import React, { Component } from 'react';
import TareaEntregaFormulario from './TareaEntregaFormulario';

class TareaEntrega extends Component{
    state={
        crear: true,
        archivo: null,
        archivo_tarea: null
    }
    componentWillMount = () => {
        const { match, leerTarea } = this.props;
        const ver = window.location.href.includes('ver-tarea-entrega');
        if (ver){
            const idTarea = match.params.id_tarea;
            if (idTarea){
                this.setState({crear: false});
                leerTarea(idTarea);
            } 
        }
    }

    setArchivoTarea = (archivo_tarea) => {
        this.setState({ archivo_tarea });
    };

    registroEntrega = (data) => {
        const { registroEntregaTarea, archivo_tarea } = this.props;
        registroEntregaTarea( {...data, archivo_tarea: null},
        [{ file: this.state.archivo, name: 'archivo_tarea' },])
    }

    render(){
        const { match, archivo, archivo_tarea, borrarArchivo } = this.props;
        const { crear } = this.state;
        const id_asignacion = match.params.id;
        return(
            <React.Fragment>
                <TareaEntregaFormulario
                    onSubmit={this.registroEntrega}
                    crear = {crear}
                    id_asignacion = {id_asignacion} 
                    archivo = {archivo}
                    borrarArchivo = {borrarArchivo}
                    setArchivoTarea = {this.setArchivoTarea}
                    archivo_tarea = {archivo_tarea}
                />
            </React.Fragment>
        );
    }
}

export default TareaEntrega;
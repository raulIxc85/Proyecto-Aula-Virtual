import React, { Component } from 'react';
import TareaEntregaFormulario from './TareaEntregaFormulario';

class TareaEntrega extends Component{
    state={
        crear: true,
        archivo: null,
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

    setArchivo = (archivo) => {
        this.setState({ archivo });
    };

    registroEntrega = (data) => {
        const { entregarTarea, archivo } = this.props;
        entregarTarea( {...data, archivo: null},
        [{ file: this.state.archivo, name: 'archivo' },])
    }

    render(){
        const { match, archivo, borrarArchivo } = this.props;
        const { crear } = this.state;
        const id_asignacion = match.params.id;
        return(
            <React.Fragment>
                <TareaEntregaFormulario
                    onSubmit={this.registroEntrega}
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

export default TareaEntrega;
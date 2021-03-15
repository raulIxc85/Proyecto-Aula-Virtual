import React, { Component } from 'react';
import TareaEntregaFormulario from './TareaEntregaFormulario';

class TareaEntrega extends Component{
    state={
        crear: false,
        archivo_tarea: null
    }
    componentWillMount = () => {
        const { match, leerTarea } = this.props;
        const ver = window.location.href.includes('ver-tarea-entrega');
        if (ver){
            const idTarea = match.params.id_tarea;
            if (idTarea){
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
        [{ file: this.state.archivo_tarea, name: 'archivo_tarea' },])
    }

    modificarEntrega = (data) => {
        const { modificarEntregaTarea, archivo_tarea } = this.props;
        modificarEntregaTarea( {...data, archivo_tarea: null},
        [{ file: this.state.archivo_tarea, name: 'archivo_tarea' },])
    }

    render(){
        const { match, archivo, archivo_tarea, borrarArchivoTarea } = this.props;
        const { crear } = this.state;
        let contador=0;
        if (!(archivo_tarea===null)){
            archivo_tarea.results.forEach(datos=>{
                contador+=1;
            })
        }
        let funcionEnvio="";
        if (contador===0){
            funcionEnvio=this.registroEntrega
        }else{
            funcionEnvio=this.modificarEntrega
        }
        const id_asignacion = match.params.id;
        return(
            <React.Fragment>
                <TareaEntregaFormulario
                    onSubmit={funcionEnvio}
                    crear = {crear}
                    id_asignacion = {id_asignacion} 
                    archivo = {archivo}
                    borrarArchivoTarea = {borrarArchivoTarea}
                    setArchivoTarea = {this.setArchivoTarea}
                    archivo_tarea = {archivo_tarea}
                />
            </React.Fragment>
        );
    }
}

export default TareaEntrega;
import React, { Component } from 'react';
import PortadaCursoForm from "./PortadaCursoForm";


class PortadaCurso extends Component {
     
    componentWillMount = () => {
        const { match, leerAsignacionAdmin, leerAsignacionPortada } = this.props;
        const id = match.params.id;
        if (id){
            //leerAsignacionAdmin(id);
            leerAsignacionPortada(id);
        }
    }
    
    setArchivo = (imagenPortada) => {
        this.setState({ imagenPortada });
    }

    actualizar = (data) => {
        const { actualizarPortada, imagenPortada } = this.props;
        actualizarPortada( {...data, imagenPortada: null},
        [{ file: this.state.imagenPortada, name: 'imagenPortada' },])
    }

    render() {
        const { lecturaCurso, imagenPortada, borrarArchivo } = this.props;
        return (
            <PortadaCursoForm 
                lecturaCurso = { lecturaCurso }
                onSubmit = { this.actualizar }
                setArchivo = { this.setArchivo }
                imagenPortada = { imagenPortada }
                borrarArchivo = { borrarArchivo }
            />
        );
    }
}

export default PortadaCurso;

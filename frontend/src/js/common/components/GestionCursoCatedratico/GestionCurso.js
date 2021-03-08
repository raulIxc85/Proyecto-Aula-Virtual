import React, { Component } from 'react';
import PortadaForm from "./PortadaForm";


class GestionCurso extends Component {
     
    componentWillMount = () => {
        const { match, leerAsignacionAdmin } = this.props;
        const id = match.params.id;
        if (id){
            leerAsignacionAdmin(id);
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
            <PortadaForm 
                lecturaCurso = { lecturaCurso }
                onSubmit = { this.actualizar }
                setArchivo = { this.setArchivo }
                imagenPortada = { imagenPortada }
                borrarArchivo = { borrarArchivo }
            />
        );
    }
}

export default GestionCurso;

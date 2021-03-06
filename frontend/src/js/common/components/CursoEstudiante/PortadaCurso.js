import React, { Component } from 'react';
import PortadaCursoForm from "./PortadaCursoForm";


class PortadaCurso extends Component {
     
    componentWillMount = () => {
        const { match, leerAsignacionPortada } = this.props;
        const id = match.params.id;
        if (id){
            leerAsignacionPortada(id);
        }
    }
    
    render() {
        const { lecturaCurso, lecturaMaterial, lecturaTarea, lecturaNotas, lecturaNota } = this.props;
        return (
            <PortadaCursoForm 
                lecturaCurso = { lecturaCurso }
                onSubmit = { this.actualizar }
                setArchivo = { this.setArchivo }
                lecturaMaterial = { lecturaMaterial }
                lecturaTarea = { lecturaTarea }
                lecturaNotas = { lecturaNotas }
                lecturaNota = { lecturaNota } 
            />
        );
    }
}

export default PortadaCurso;

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
    
    render() {
        const { lecturaCurso } = this.props;
        return (
            <PortadaForm 
                lecturaCurso={lecturaCurso} 
            />
        );
    }
}

export default GestionCurso

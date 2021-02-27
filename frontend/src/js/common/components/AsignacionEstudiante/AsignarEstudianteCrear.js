import React, { Component } from 'react';
import Formulario from './Formulario';


class AsignarEstudianteCrear extends Component{
   
    componentWillMount = () => {
        const { match, leerAsignacion } = this.props;
        const id = match.params.id;
        if (id){
            this.setState({crearA: false});
            leerAsignacion(id);
        }
    }
    render(){
        const { registroAsignacionEstudiante, obtenerEstudiantes, listarEstudiantes, lecturaEstudiantes } = this.props;
        return(
           
            <Formulario
                obtenerEstudiantes = {obtenerEstudiantes}
                onSubmit={registroAsignacionEstudiante}
                listarEstudiantes = {listarEstudiantes}
                lecturaEstudiantes = {lecturaEstudiantes}
            />
           
        );
    }
}

export default AsignarEstudianteCrear;
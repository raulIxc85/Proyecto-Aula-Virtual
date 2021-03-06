import React, { Component } from 'react';
import Formulario from './Formulario';

class MaterialClaseCrear extends Component{
    state={
        crear: true,
    }
    componentWillMount = () => {
        const { leer, match } = this.props;
        const ver = window.location.href.includes('ver-material');
        const editar = window.location.href.includes('editar');
        if (ver || editar){
            const idMaterial = match.params.id_material;
            if (idMaterial){
                this.setState({crear: false});
                leer(idMaterial);
            } 
        }
    }

    setArchivo = (archivo) => {
        this.setState({ archivo });
    };

    registro = (data) => {
        const { registroMaterial, archivo } = this.props;
        registroMaterial( {...data, archivo: null},
        [{ file: this.state.archivo, name: 'archivo' },])
        
    }

    actualizar = (data) => {
        const { editarMaterial, archivo } = this.props;
        editarMaterial( {...data, archivo: null},
        [{ file: this.state.archivo, name: 'archivo' },])
    }

    render(){
        const { archivo, match, borrarArchivo } = this.props;
        const { crear } = this.state;
        const id_asignacion = match.params.id;
        const funcion = crear ? this.registro : this.actualizar;
        return(
            <Formulario
                onSubmit={funcion}
                crear = {crear}
                archivo = {archivo}
                setArchivo = {this.setArchivo}
                id_asignacion = {id_asignacion}
                borrarArchivo = {borrarArchivo}
            />
        );
    }
}

export default MaterialClaseCrear;
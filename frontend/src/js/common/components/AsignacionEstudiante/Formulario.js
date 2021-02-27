import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    renderField,
    AsyncSelectField,
} from "../Utils/renderField/renderField";
import ListadoEstudiantes from './ListadoEstudiantes';

class Formulario extends Component{
    
    render() {
        const { handleSubmit, obtenerEstudiantes, listarEstudiantes, lecturaEstudiantes } = this.props;
        let titulo = 'Asignar Estudiante';
        
        return (
            <React.Fragment>
                <form onSubmit={handleSubmit} className='w-50'>
                    <h3>{titulo}</h3>
                    <div className="mb-4 card card-small">
                        <div className="border-bottom card-header"><h6 className="m-0"></h6></div>
                        <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                            <div className="d-flex flex-column flex-1 mx-3">
                                <label>Estudiante</label>
                                <Field 
                                    name="estudiante"
                                    placeholder="Seleccionar..." 
                                    component={AsyncSelectField} 
                                    loadOptions={obtenerEstudiantes} 
                                    className="form-control" 
                                />  
                               
                                <button
                                    className={'btn btn-sm mt-3 btn-primary'}
                                    type='submit'
                                >   
                                    Asignar
                                </button>  
                                <br />
                                <div className='d-flex flex-row justify-content-end mt-3'>
                                    <a
                                        href='/#/cursos-asignados'
                                        className='btn btn-secondary btn-sm mr-2 mb-3'
                                    >
                                        Cancelar
                                    </a>
                                
                                </div>  
                            </div>
                        </div>
                    </div>
                
                </form>
                <ListadoEstudiantes
                    listarEstudiantes = {listarEstudiantes}
                    data = {lecturaEstudiantes}
                />
            </React.Fragment>
        )
    }
}

export default reduxForm({
    form: 'asignacionEstudianteForm', //identificador unico
   
})(Formulario)

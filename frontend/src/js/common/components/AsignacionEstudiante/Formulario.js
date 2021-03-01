import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    renderField,
    AsyncSelectField,
    RenderField,
} from "../Utils/renderField/renderField";
import ListadoEstudiantes from './ListadoEstudiantes';

class Formulario extends Component{
    
    render() {
        const { handleSubmit, obtenerEstudiantes, listarEstudiantes, lecturaEstudiantes, eliminar } = this.props;
        let titulo = 'Asignar Estudiante';
        
        return (
            <React.Fragment>
                <form onSubmit={handleSubmit} >
                    <h3>{titulo}</h3>
                    <div className="row">
                        <div className='col-sm-6'>
                            <div className="mb-4 card card-small">
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
                                        
                                       
                                        <br />
                                        <div className='d-flex flex-row justify-content-end mt-3'>
                                            <button
                                                className={'btn btn-sm mb-3 mr-2 btn-primary'}
                                                type='submit'
                                            >   
                                                Asignar
                                            </button>  
                                            <a
                                                href='/#/cursos-asignados'
                                                className='btn btn-secondary btn-sm mb-3'
                                            >
                                                Cancelar
                                            </a>
                                            
                                        </div>  
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <div className="mb-4 card card-small">
                                <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                                    <div className="d-flex flex-column flex-1 mx-3 mb-4">
                                        <label>Grado</label>
                                        <Field 
                                            name="grado.descripcion"
                                            component={renderField} 
                                            className="form-control" 
                                            disabled={false}
                                        />  
                                        <label>Curso</label>
                                        <Field 
                                            name="curso.nombre"
                                            component={renderField} 
                                            className="form-control" 
                                            disabled={false}
                                        />  
                                        <div className="w-25">
                                            <label>Sección</label>
                                            <Field 
                                                name="seccion.descripcion"
                                                component={renderField} 
                                                className="form-control"
                                                disabled={false} 
                                            />  
                                            <label>Ciclo</label>
                                            <Field 
                                                name="ciclo.ciclo"
                                                component={renderField} 
                                                className="form-control"
                                                disabled={false} 
                                            />  
                                        </div>
                                        
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <ListadoEstudiantes
                    listarEstudiantes = {listarEstudiantes}
                    data = {lecturaEstudiantes}
                    eliminar = {eliminar}
                />
            </React.Fragment>
        )
    }
}

export default reduxForm({
    form: 'asignacionEstudianteForm', //identificador unico
   
})(Formulario)

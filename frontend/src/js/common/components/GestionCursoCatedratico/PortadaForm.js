import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderFilePicker } from '../Utils/renderField/renderField';

class PortadaForm extends Component {
    componentWillUnmount = () => {
        const { borrarArchivoPortada } = this.props;
        borrarArchivoPortada();
    }
    render() {
        const { handleSubmit, lecturaCurso, setArchivo, imagenPortada } = this.props;
        
        let nombreCurso;
        let grado;
        let seccion;
        let id;
        let imagen;
      
        if (lecturaCurso === undefined || lecturaCurso === null) {
            nombreCurso="";
            grado="";
            seccion="";
            id="";
            
        }else{
            nombreCurso = lecturaCurso.curso.nombre;
            grado = lecturaCurso.grado.descripcion;
            seccion = "Sección: " + lecturaCurso.seccion.descripcion;
            id = lecturaCurso.id;
            if (!(imagenPortada === null)){
                imagen = imagenPortada.imagenPortada;
            }
        }
    
        return (
            <React.Fragment>
                <form action="" onSubmit={handleSubmit} className="py-4">
                    <h3>{nombreCurso}</h3>
                    <h5>{grado}</h5>
                    <h5>{seccion}</h5>
                    <div className="mb-4 card card-small">
                        <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                            <div className="d-flex flex-column flex-1 mx-3">
                                <div className="form-group has-feedback flex-1 mx-3">
                                    <label htmlFor="imagenPortada">Imagen Portada</label>
                                    <Field 
                                        accept=".image/*" 
                                        name="portada" 
                                        setFile={setArchivo} 
                                        photo={imagen}
                                        component={renderFilePicker} 
                                   />
                                    <img className="mx-auto d-block" src={imagen} height="50" />
                                </div>
                                    
                            </div>
                        </div>
                            
                        <div className="d-flex justify-content-center mt-3">
                            <button 
                                className="btn btn-primary mr-3 mb-3" 
                                type='submit'
                            >
                                Actualizar Portada
                            </button>
                            <a
                                href='/#/cursos-asignados'
                                className='btn btn-secondary mb-3'
                            >
                                Cancelar
                            </a>
                        </div>
                    </div>
                    </form>
                    <div className="row justify-content-center align-items-center">
                        <div className='w-50'>
                            <div className="mb-4 card card-small">
                                <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                                    <div className="d-flex flex-column flex-1 mx-3">
                                        <a
                                            href={`/#/cursos-asignados/${id}/tareas`}
                                            className='btn btn-secondary mb-3'
                                        >
                                            Tareas
                                        </a>
                                        <a
                                            href={`/#/cursos-asignados/${id}/material`}
                                            className='btn btn-secondary mb-3'
                                        >
                                            Material de clase
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </React.Fragment>
        )
    }
}

export default reduxForm({
    form: 'portadaForm', //identificador unico
})(PortadaForm)

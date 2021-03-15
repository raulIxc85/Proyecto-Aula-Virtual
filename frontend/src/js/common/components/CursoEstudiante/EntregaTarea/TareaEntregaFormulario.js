import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    renderTextArea,
    renderFilePicker,
    renderField
} from "../../Utils/renderField/renderField";


class TareaEntregaFormulario extends Component{
    componentWillUnmount = () => {
        const { borrarArchivoTarea } = this.props;
        borrarArchivoTarea();
    }
    render() {
        const { handleSubmit, crear, id_asignacion, archivo, setArchivoTarea, archivo_tarea } = this.props;
        let editar = true;
        let verLink = '';
        let verLink2 = '';
        let verArchivo = archivo;
        let verArchivo2 = '';
        let titulo, fecha, descripcion, hora, valorTarea, texto, id;
        
        if (archivo_tarea === undefined || archivo_tarea === null) {
            texto = "";
            id = "";
            verArchivo2 = "";
        }else {
            texto = archivo_tarea.texto;
            id = archivo_tarea.id;
            verArchivo2 = archivo_tarea.archivo;
            if (verArchivo2 === undefined || verArchivo2 === null){
                verLink2 = 'd-none';
                editar=false;
            }
        }

        if (archivo === undefined || archivo === null) {
            titulo = "";
            fecha = "";
            descripcion = "";
            hora = "";
            valorTarea = "";
        }else {
            titulo = archivo.tituloTarea;
            fecha = archivo.fecha;
            descripcion = archivo.descripcion;
            hora = archivo.hora,
            valorTarea = archivo.valorTarea;
        }
      
        if (!(archivo === null)) {
            verArchivo = archivo.archivo;
        }else{
            verLink = 'd-none';
        }

        if (crear == false){
            if (verArchivo===null){
                verLink = 'd-none';
            }
            
        }      
                                   
        return (
            <div className="row">
                <div className='col-sm-6'>
                    <h3>{ titulo }</h3>
                    <div className="mb-4 card card-small">
                        <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                            <div className="d-flex flex-column flex-1 mx-3 mr-2">
                                <label>Descripcion: </label>
                                <p>{descripcion}</p>
                                <div className={`${verLink}`}>
                                    <br />
                                    <div className="text-center">
                                        <a className='btn btn-info sm' href={verArchivo} target="_blank">Ver archivo</a>
                                    </div>
                                    <br />
                                </div>
                                
                                <div className='w-50'>
                                    
                                    <label htmlFor="fecha">Fecha Entrega: {fecha} </label>
                                    <label htmlFor="hora">Hora Entrega: {hora}</label>
                                    <label htmlFor="valorTarea">Valor Tarea: {valorTarea}</label>
                                    
                                </div>
                                <br />
                                <div className='d-flex flex-row justify-content-end mt-3'>
                                    <a
                                        href={`/#/cursos-asignados-estudiante/${id_asignacion}/ver-curso-estudiante`}
                                        className='btn btn-secondary btn-sm mr-2 mb-3'
                                    >
                                        Cancelar
                                    </a>
                                    
                                </div>  
                            </div>
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className='col-sm-6'>
                    <h3>Entregar Tarea</h3>
                    <div className="mb-4 card card-small">
                        <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                            <div className="d-flex flex-column flex-1 mx-3">
                                <label htmlFor="texto">Respuesta</label>
                                <Field 
                                    name="texto"
                                    component={renderTextArea} 
                                    
                                />
                                <div className='d-none'>
                                    <Field 
                                        name="id"
                                        component={renderField} 
                                        
                                    />
                                </div>
                                <div className="form-group has-feedback flex-1 mx-2">
                                    <label htmlFor="archivo">Subir Archivo</label>
                                    <Field
                                        accept=".pdf,document/*" 
                                        name="archivo" 
                                        setFile={setArchivoTarea}
                                        photo={verArchivo2}
                                        component={renderFilePicker} 
                                        
                                    />
                                </div>
                                <div className={`${verLink2}`}>
                                    <br />
                                    <div className="text-center">
                                        <a className='btn btn-info sm' href={verArchivo2} target="_blank">Ver archivo</a>
                                    </div>
                                    <br />
                                </div>
                            
                                <div className='d-flex flex-row justify-content-end mt-3'>
                                    <a
                                        href={`/#/cursos-asignados-estudiante/${id_asignacion}/ver-curso-estudiante`}
                                        className='btn btn-secondary btn-sm mr-2 mb-3'
                                    >
                                        Cancelar
                                    </a>
                                    <button
                                        className='btn btn-sm mb-3 btn-primary'
                                        type='submit'
                                    >   
                                        { editar ? 'Modificar Tarea' : 'Entregar Tarea' }
                                    </button>  
                                    
                                </div>  
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: 'tareaEntregaForm', //identificador unico
   
})(TareaEntregaFormulario)

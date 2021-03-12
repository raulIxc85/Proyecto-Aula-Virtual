import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    renderTextArea,
    renderFilePicker
} from "../../Utils/renderField/renderField";


class TareaEntregaFormulario extends Component{
    componentWillUnmount = () => {
        const { borrarArchivo } = this.props;
        borrarArchivo();
    }
    render() {
        const { handleSubmit, crear, id_asignacion, archivo, setArchivoTarea, archivo_tarea } = this.props;
        let disabled = false;
        let verLink = '';
        let verLink2 = '';
        let verArchivo = archivo;
        let verArchivo2 = archivo_tarea;
        let titulo, fecha, descripcion, hora, valorTarea, texto;
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
        if (archivo_tarea === undefined || archivo_tarea === null) {
            texto = "";
        }else {
            //texto = archivo_tarea.estudiante.texto;
        }
        if (!(archivo_tarea === null)) {
            
            //verArchivo2 = archivo_tarea.estudiante.archivo;
           
        }else{
            verLink2 = 'd-none';
        }

        if (!(archivo === null)) {
            verArchivo = archivo.archivo;
           
        }else{
            verLink = 'd-none';
        }

        if (crear == false){
            disabled = true;
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
                                        <a href={verArchivo} target="_blank">Ver archivo</a>
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
                                    {disabled == false && 
                                        <button
                                            className='btn btn-sm mb-3 btn-primary'
                                            type='submit'
                                        >   
                                            Entregar Tarea
                                        </button>  
                                    }
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
                                <label>Respuesta</label>
                                <Field 
                                    name="estudiante.texto"
                                    component={renderTextArea} 
                                    
                                />
                                <div className="form-group has-feedback flex-1 mx-2">
                                    <label htmlFor="archivo">Subir Archivo</label>
                                    <Field
                                        accept=".pdf,document/*" 
                                        name="archivo" 
                                        setFile={setArchivoTarea}
                                        photo={archivo_tarea}
                                        component={renderFilePicker} 
                                        
                                    />
                                </div>
                                <div className={`${verLink2}`}>
                                    <br />
                                    <div className="text-center">
                                        <a href={verArchivo2} target="_blank">Ver archivo</a>
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
                                        Entregar Tarea
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

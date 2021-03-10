import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    renderField,
    renderTextArea,
    renderFilePicker,
    renderDayPicker,
    renderNumber
} from "../Utils/renderField/renderField";


class TareaEntregaFormulario extends Component{
    componentWillUnmount = () => {
        const { borrarArchivo } = this.props;
        borrarArchivo();
    }
    render() {
        const { handleSubmit, crear, id_asignacion, setArchivo, archivo } = this.props;
        let disabled = false;
        let ocultar = '';
        let verLink = '';
        let verArchivo = archivo;
        if (!(archivo === null)) {
            ocultar = 'd-none';
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
            <form onSubmit={handleSubmit} className='w-50'>
                <h3>{ archivo.tituloTarea }</h3>
                <div className="mb-4 card card-small">
                    <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                        <div className="d-flex flex-column flex-1 mx-3">
                            <label>Descripcion</label>
                            <Field 
                                name="descripcion" 
                                component={renderTextArea} 
                                disabled={disabled} 
                            />
                            <div className={`form-group has-feedback flex-1 mx-2 ${ocultar}`}>
                                <label htmlFor="archivo">Subir Archivo</label>
                                <Field
                                    accept=".pdf,document/*" 
                                    name="archivo" 
                                    setFile={setArchivo}
                                    photo={archivo}
                                    component={renderFilePicker} 
                                    
                                />
                            </div>
                            <div className={`${verLink}`}>
                                <br />
                                <div className="text-center">
                                    <a href={verArchivo} target="_blank">Ver archivo</a>
                                </div>
                                <br />
                            </div>
                            
                            <div className='w-50'>
                                
                                <label htmlFor="fecha">Fecha Entrega: {archivo.fecha} </label>
                                <label htmlFor="hora">Hora Entrega: {archivo.hora}</label>
                                <label htmlFor="valorTarea">Valor Tarea: {archivo.valorTarea}</label>
                                
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
            </form>
        )
    }
}

export default reduxForm({
    form: 'tareaEntregaForm', //identificador unico
   
})(TareaEntregaFormulario)

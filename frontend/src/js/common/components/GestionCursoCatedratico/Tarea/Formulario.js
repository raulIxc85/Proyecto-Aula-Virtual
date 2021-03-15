import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    renderField,
    renderTextArea,
    renderFilePicker,
    renderDayPicker,
    renderNumber
} from "../../Utils/renderField/renderField";


class Formulario extends Component{
    componentWillUnmount = () => {
        const { borrarArchivo } = this.props;
        borrarArchivo();
    }
    render() {
        const { handleSubmit, crear, id_asignacion, setArchivo, archivo } = this.props;
        const editar = window.location.href.includes('editar');
        let titulo = editar ? 'Modificar Tarea' : 'Registrar Tarea';
        let disabled = false;
        let ocultar = '';
        let verLink = '';
        let verArchivo = archivo;
        if (!(archivo === null)) {
            ocultar = 'd-none';
            verArchivo = archivo.archivo;
            if (editar == true){
                ocultar='';
            }
        }else{
            verLink = 'd-none';
        }

        if (crear == false && editar == false){
            disabled = true;
            titulo = 'Ver Tarea';
            if (verArchivo===null){
                verLink = 'd-none';
            } 
        }      
       
        
        return (
            <form onSubmit={handleSubmit} className='w-50'>
                <h3>{titulo}</h3>
                <div className="mb-4 card card-small">
                    <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                        <div className="d-flex flex-column flex-1 mx-3">
                            <label htmlFor="tituloTarea">Titulo Tarea</label>
                            <Field 
                                name="tituloTarea" 
                                component={renderField} 
                                disabled={disabled} 
                            />
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
                            
                            <div className='w-25'>
                                <label htmlFor="fecha">Fecha Entrega</label>
                                <Field
                                    disabled={disabled} 
                                    name="fecha"
                                    component={renderDayPicker}
                                   
                                />
                                <label htmlFor="hora">Hora Entrega</label>
                                <Field
                                    name="hora"
                                    type="time"
                                    component={renderField}
                                    disabled={disabled} 
                                />
                                <label htmlFor="valorTarea">Valor Tarea</label>
                                <Field
                                    name="valorTarea"
                                    decimalScale={1}
                                    component={renderNumber}
                                    disabled={disabled} 
                                />
                            </div>
                            <br />
                            <div className='d-flex flex-row justify-content-end mt-3'>
                                <a
                                    href={`/#/cursos-asignados/${id_asignacion}/tareas`}
                                    className='btn btn-secondary btn-sm mr-2 mb-3'
                                >
                                    Cancelar
                                </a>
                                {disabled == false && 
                                    <button
                                        className={`btn btn-sm mb-3 ${editar ? 'btn-success' : 'btn-primary'}`}
                                        type='submit'
                                    >   
                                        { editar ? 'Modificar' : 'Registrar' }
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
    form: 'tareaForm', //identificador unico
   
})(Formulario)

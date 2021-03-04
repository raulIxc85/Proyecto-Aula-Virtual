import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    renderField,
    renderTextArea,
    renderFieldCheck,
    renderDayPicker,
    renderNumber
} from "../../Utils/renderField/renderField";


class Formulario extends Component{
    render() {
        const { handleSubmit, crear, id_asignacion } = this.props;
        const editar = window.location.href.includes('editar');
        let titulo = editar ? 'Modificar Tarea' : 'Registrar Tarea';
        let disabled = false;
        if (crear == false && editar == false){
            disabled = true;
            titulo = 'Ver Tarea';
        }
        return (
            <form onSubmit={handleSubmit} className='w-75'>
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
                            <br />
                             <Field
                                type="checkbox"
                                disabled={disabled}
                                name="aceptaDocumento"
                                label="Documento adjunto"
                                component={renderFieldCheck}
                            />
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
                                    decimalScale={2}
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

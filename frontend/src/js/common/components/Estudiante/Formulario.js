import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    renderField,
    renderNumber,
    SelectField,
} from "../Utils/renderField/renderField";

const genders = [
    {"label": "Masculino", "value": 0},
    {"label": "Femenino", "value": 1},
];

class Formulario extends Component{
    render(){
        
        return(
            <form >
                <h3>Estudiante Registro</h3>
                <div className='w-25'>
                    <label>Carnet</label>
                    <Field name='carnet' component={renderField} />
                </div>
                <label>Nombres</label>
                <Field name='nombres' component={renderField} />
                <label>Apellidos</label>
                <Field name='apellidos' component={renderField} />
                <label>Direccion</label>
                <Field name='direccion' component={renderField} />
                <div className='w-25'>
                    <label>Telefono</label>
                    <Field
                        numberFormat={"+(502) ####-####"}
                        name='telefono' 
                        component={renderNumber} 
                    />
                </div>
                <label>Nombre Contacto</label>
                <Field name='nombreContacto' component={renderField} />
                <label>Direccion de Contacto</label>
                <Field name='direccionContacto' component={renderField} />
                <div className='row'>
                    <div className='col-md-6'>
                        <label>Telefono de Contacto</label>
                        <Field 
                            numberFormat={"+(502) ####-####"}
                            name='telefonoContacto' 
                            component={renderNumber} 
                        />
                    </div>
                    <div className='col-md-6'>
                        <label>Correo Electronico</label>
                        <Field name='email' component={renderField} />
                    </div>
                    
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <label>Contraseña</label>
                        <Field name='password' component={renderField} />
                    </div>
                    <div className='col-md-6'>
                        <label>Confirmación de Contraseña</label>
                        <Field name='confirmacion' component={renderField} />
                    </div>   
                    <div className='col-md-6'>
                        <label>Género</label>
                        <Field name="gender" placeholder="Género" component={SelectField} options={genders} className="form-control" />
                    </div> 
                </div>
                
                <br />
                <div className='d-flex flex-row justify-content-end mt-3'> 
                    <a
                        href='/#/estudiantes'
                        className='btn btn-secondary btn-sm mr-2'
                    >
                        Cancelar
                    </a>
                    
                    
                    <button
                        className='btn btn-sm btn-primary'
                        type='submit'
                    >   
                        Registrar 
                    </button>
               
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'estudiante' //identificador unico del formulario
})(Formulario)

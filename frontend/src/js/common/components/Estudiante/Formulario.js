import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    renderField,
    renderNumber,
    SelectField,
} from "../Utils/renderField/renderField";
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';

const GENDERS = [
    {"label": "Masculino", "value": 0},
    {"label": "Femenino", "value": 1},
];

const ROL = [
    {"label": "Estudiante", "value": 3},
];

class Formulario extends Component{
    render(){
        const { handleSubmit, crear } = this.props;
        const editar = window.location.href.includes('editar');
        let titulo = editar ? 'Modificar Estudiante' : 'Registrar Estudiante';
        let disabled = false;
        if (crear == false && editar == false){
            disabled = true;
            titulo = 'Ver Estudiante';
        }

        return(
            <form onSubmit={handleSubmit} >
                <h3>{titulo}</h3>
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
                        <Field name='username' component={renderField} />
                    </div>
                    
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <label>Contraseña</label>
                        <Field name='password' component={renderField} type="password" />
                    </div>
                    <div className='col-md-6'>
                        <label>Confirmar Contraseña</label>
                        <Field name='confirmacion' component={renderField} type="password" />
                    </div>   
                    <div className='col-md-6'>
                        <label>Género</label>
                        <Field name="gender" placeholder="Género" component={SelectField} options={GENDERS} className="form-control" />
                    </div>
                    <div className='col-md-6'>
                        <label>Rol</label>
                        <Field name="rol" placeholder="Rol" component={SelectField} options={ROL} className="form-control" />
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
                    
                    { disabled == false &&
                        <button
                            className={`btn btn-sm ${editar ? 'btn-success' : 'btn-primary'}`}
                            type='submit'
                        >   
                            Registrar 
                        </button>
                    }
                </div>
            </form>
        );
    }
}

export const matchPassword = (pass, confirm) => validatorFromFunction(value => {
    return pass === confirm;
});

export default reduxForm({
    form: 'estudiante', //identificador unico del formulario
    validate: (data) => {
        return validate(data, {
            confirmPassword: combine(
               validators.exists()('Este campo es requerido'),
               matchPassword(data.password, data.confirmPassword)()('Las contraseñas no coinciden')
            ),
            username: validators.exists()('Este campo es requerido'),
            password: validators.exists()('Este campo es requerido'),
        });
    },
})(Formulario)

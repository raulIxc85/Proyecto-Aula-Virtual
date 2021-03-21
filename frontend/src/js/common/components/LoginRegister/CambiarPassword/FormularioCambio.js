//Recuperar Contraseña
import React, { Component } from 'react'
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import { Field, reduxForm } from 'redux-form';
import { renderField } from '../../Utils/renderField';
import { Link } from 'react-router-dom';

class FormularioCambio extends Component{
    render(){
        const { handleSubmit } = this.props;
        
        return (
            <form className="form-validate mb-lg" onSubmit={handleSubmit}>
                <div className="form-group has-feedback">
                    <label htmlFor="password">Contraseña</label>
                        <Field
                            name="password"
                            label="Contraseña"
                            component={renderField}
                            type="password"
                            className="form-control"
                        />
                </div>
                <div className="form-group has-feedback">
                    <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                        <Field
                            name="confirmPassword"
                            label="Confirmar Contraseña"
                            component={renderField}
                            type="password"
                            className="form-control"
                        />
                </div>
                <div className="buttons-box">
                    <button 
                        type="submit" 
                        className="btn btn-primary m-1 align-self-center">
                        Cambiar Contraseña
                    </button>
                    
                    <Link to="/login" 
                           
                        className="btn btn-secondary btn-sm mr-2 align-self-center"
                    >
                        Cancelar
                    </Link>
                    
                </div>
        </form>
       
        );
    }
};

export const matchPassword = (pass, confirm) => validatorFromFunction(value => {
    return pass === confirm;
});

export default reduxForm({
    form: 'cambiarPassTokenForm', // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            confirmPassword: combine(
               validators.exists()('Este campo es requerido'),
               matchPassword(data.password, data.confirmPassword)()('Las contraseñas no coinciden')
            ),
            password: validators.exists()('Este campo es requerido'),
        });
    },
})(FormularioCambio);

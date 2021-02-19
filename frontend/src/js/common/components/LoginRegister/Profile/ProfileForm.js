import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import {renderField, renderFilePicker, SelectField, renderNumber} from '../../Utils/renderField/renderField';

const genders = [
    {"label": "Masculino", "value": 0},
    {"label": "Femenino", "value": 1},
];

const ProfileForm = (props) => {
    const { handleSubmit, me, setAvatar } = props;
    
    return (
            <form action="" onSubmit={handleSubmit} className="py-4">
                <h3>Editar Perfil</h3>
                <div className="mb-4 card card-small">
                    <div className="border-bottom card-header"><h6 className="m-0">{me.profile.nombres} {me.profile.apellidos}</h6></div>
                    <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                        <div className="d-flex flex-column flex-1 mx-3">
                            
                            <div className="form-group has-feedback">
                                <label htmlFor="profile.nombres">Nombres</label>
                                <Field name="profile.nombres" placeholder="Nombre" component={renderField} type="text" className="form-control" />
                            </div>

                            <div className="form-group has-feedback">
                                <label htmlFor="profile.apellidos">Apellidos</label>
                                <Field name="profile.apellidos" placeholder="Nombre" component={renderField} type="text" className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                        <div className="form-group has-feedback flex-1 mx-3">
                            <div className="form-group has-feedback">
                                <label htmlFor="profile.telefono">Teléfono</label>
                                <Field
                                    numberFormat={"+(502) ####-####"}
                                    name="profile.telefono"
                                    placeholder="Teléfono"
                                    component={renderNumber}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group has-feedback">
                                <label htmlFor="profile.gender">Género</label>
                                <Field name="profile.gender" placeholder="Género" component={SelectField} options={genders} className="form-control" />
                            </div>
                        </div>
                        <div className="form-group has-feedback flex-1 mx-3">
                            <div className="form-group has-feedback">
                                <label htmlFor="profile.direccion">Dirección</label>
                                <Field name="profile.direccion" placeholder="Dirección" component={renderField} type="text" className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <button className="btn btn-primary mr-3 mb-3">Guardar Cambios</button>
                        <a
                            href='/#/'
                            className='btn btn-secondary mb-3'
                        >
                            Cancelar
                        </a>
                    </div>
                </div>
            </form>
        );
};

export default reduxForm({
    form: 'profile', // a unique identifier for this form
})(ProfileForm);

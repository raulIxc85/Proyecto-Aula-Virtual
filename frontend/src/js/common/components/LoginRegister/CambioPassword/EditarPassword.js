import React, { Component } from 'react';
import Formulario from './Formulario';

class EditarPassword extends Component {
    state={
        editar: true,
    }
    render() {
        const { cambiarPass } = this.props;
        const { editar } = this.state;
        return (
            <React.Fragment>
                <div className="d-flex flex-column align-items-center pt-3 ">
                    <h4>Cambio de Contraseña</h4>
                </div>
                <br />
                <div className="login-wrapper">
                    <div className="card card-login col-lg-4 col-md-4 col-11">
                        <Formulario
                            editar = {editar}
                            onSubmit = {cambiarPass}
                        />
                    </div>
                </div>
            </React.Fragment>
            
        );
    }
}

export default EditarPassword;

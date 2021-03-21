//Recuperar Contraseña
import { connect } from 'react-redux';
import { actions } from '../../../../redux/modules/cuenta/cambiarPassword';
import CambiarPassword from './CambiarPassword';

const ms2p = (state) => {
    return {
        ...state.cambiarPass,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(CambiarPassword);

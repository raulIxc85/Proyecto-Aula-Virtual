import { connect } from 'react-redux';
import { actions } from '../../../../redux/modules/materialClase/materialClase';
import MaterialClaseList from './MaterialClaseList';

const ms2p = (state) => {
    return {
        ...state.material,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(MaterialClaseList);

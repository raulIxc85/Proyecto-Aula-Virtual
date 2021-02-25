import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/asignacionCatedratico/asignacion';
import AsignacionList from './AsignacionList';


const ms2p = (state) => {
  return {
    ...state.asignacion,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(AsignacionList);

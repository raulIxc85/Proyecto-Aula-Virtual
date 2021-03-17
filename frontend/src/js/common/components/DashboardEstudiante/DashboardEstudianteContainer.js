import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/dashboardEstudiante/dashboardEstudiante';
import DashboardEstudiante from './DashboardEstudiante';

const ms2p = (state) => {
    return {
        ...state.dashboardEstudiante,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(DashboardEstudiante);


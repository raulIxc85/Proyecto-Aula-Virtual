import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/dashboardCatedratico/dashboardCatedratico';
import DashboardCatedratico from './DashboardCatedratico';

const ms2p = (state) => {
    return {
        ...state.dashboardCatedratico,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(DashboardCatedratico);


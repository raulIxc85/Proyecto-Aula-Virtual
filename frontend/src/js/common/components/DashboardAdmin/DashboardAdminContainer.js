import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/dashboardAdmin/dashboardAdmin';
import DashboardAdmin from './DashboardAdmin';

const ms2p = (state) => {
    return {
        ...state.dashboardAdmin,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(DashboardAdmin);


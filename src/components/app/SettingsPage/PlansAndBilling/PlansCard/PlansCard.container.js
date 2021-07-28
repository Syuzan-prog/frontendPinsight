import { connect } from 'react-redux';

import { requestPlanUpgrade } from 'state/modules/plans';
import { getPlanIsActive, getPlanIsRequesting } from 'state/selectors/plans.selectors';

import PlansCard from './PlansCard';

const mapStateToProps = (state, props) => ({
    isActive: getPlanIsActive(state, props),
    isRequesting: getPlanIsRequesting(state, props),
});

const mapDispatchToProps = (dispatch, { title }) => ({
    requestUpgrade: (cb) => dispatch(requestPlanUpgrade(title, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlansCard);

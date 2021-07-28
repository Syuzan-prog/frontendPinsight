import { connect } from 'react-redux';

import { getCurrentPlanMeta } from 'state/selectors/plans.selectors';

import CurrentPlan from './CurrentPlan';

const mapStateToProps = (state) => ({
    ...getCurrentPlanMeta(state),
});

export default connect(mapStateToProps)(CurrentPlan);

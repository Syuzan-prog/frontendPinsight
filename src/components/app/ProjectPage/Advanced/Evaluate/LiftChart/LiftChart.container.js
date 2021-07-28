import { connect } from 'react-redux';

import { getLiftChartData } from 'state/selectors/projects.selectors';

import LiftChart from './LiftChart';

const mapStateToProps = (state) => ({
    data: getLiftChartData(state),
});

export default connect(mapStateToProps)(LiftChart);

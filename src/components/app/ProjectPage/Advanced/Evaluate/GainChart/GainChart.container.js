import { connect } from 'react-redux';

import { getGainChartData } from 'state/selectors/projects.selectors';

import GainChart from './GainChart';

const mapStateToProps = (state) => ({
    data: getGainChartData(state),
});

export default connect(mapStateToProps)(GainChart);

import { connect } from 'react-redux';

import { getRPSegmentPlotData } from 'state/selectors/projects.selectors';

import RPSegmentPlot from './RPSegmentPlot';

const mapStateToProps = (state) => ({
    data: getRPSegmentPlotData(state),
});

export default connect(mapStateToProps)(RPSegmentPlot);

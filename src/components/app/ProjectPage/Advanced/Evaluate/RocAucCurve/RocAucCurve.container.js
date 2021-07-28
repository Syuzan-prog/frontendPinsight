import { connect } from 'react-redux';

import {
    getRocAucChartData,
    getRocAucThresholdCoordinates,
    getCurrentThreshold,
    getRocAucChartAuc,
} from 'state/selectors/projects.selectors';

import RocAucCurve from './RocAucCurve';

const mapStateToProps = (state) => ({
    data: getRocAucChartData(state),
    thresholdPoint: getRocAucThresholdCoordinates(state),
    currentThreshold: getCurrentThreshold(state),
    auc: getRocAucChartAuc(state),
});

export default connect(mapStateToProps)(RocAucCurve);

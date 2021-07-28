import { connect } from 'react-redux';

import {
    getPrecisionRecallCurveChartData,
    getPrecisionRecallThresholdCoordinates,
    getCurrentThreshold,
    getPrecisionRecallChartAuc,
} from 'state/selectors/projects.selectors';

import PrecisionRecallCurve from './PrecisionRecallCurve';

const mapStateToProps = (state) => ({
    data: getPrecisionRecallCurveChartData(state),
    thresholdPoint: getPrecisionRecallThresholdCoordinates(state),
    currentThreshold: getCurrentThreshold(state),
    auc: getPrecisionRecallChartAuc(state),
});

export default connect(mapStateToProps)(PrecisionRecallCurve);

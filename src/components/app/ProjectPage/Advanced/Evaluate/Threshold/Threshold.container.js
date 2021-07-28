import { connect } from 'react-redux';

import { getOptimalThreshold, getThresholdSteps } from 'state/selectors/projects.selectors';
import { fetchEvaluateData } from 'state/modules/projects';

import Threshold from './Threshold';

const mapStateToProps = (state) => ({
    optimalThreshold: getOptimalThreshold(state),
    thresholdSteps: getThresholdSteps(state),
});

const mapDispatchToProps = {
    fetchEvaluateData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Threshold);

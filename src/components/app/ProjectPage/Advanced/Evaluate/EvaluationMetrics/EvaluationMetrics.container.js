import { connect } from 'react-redux';

import { getEvaluationMetricsFixed } from 'state/selectors/projects.selectors';

import EvaluationMetrics from './EvaluationMetrics';

const mapStateToProps = (state) => ({
    metrics: getEvaluationMetricsFixed(state),
});

export default connect(mapStateToProps)(EvaluationMetrics);

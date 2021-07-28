import { connect } from 'react-redux';

import { getConfusionMatrix, getTargetVariable } from 'state/selectors/projects.selectors';

import ConfusionMatrix from './ConfusionMatrix';

const mapStateToProps = (state) => ({
    matrix: getConfusionMatrix(state),
    targetVariable: getTargetVariable(state),
});

export default connect(mapStateToProps)(ConfusionMatrix);

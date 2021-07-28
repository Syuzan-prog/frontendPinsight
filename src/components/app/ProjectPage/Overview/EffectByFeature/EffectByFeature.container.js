import { connect } from 'react-redux';

import { getTargetVariable, getProjectType } from 'state/selectors/projects.selectors';

import EffectByFeature from './EffectByFeature';

const mapStateToProps = (state) => ({
    targetVariable: getTargetVariable(state),
    projectType: getProjectType(state),
});

export default connect(mapStateToProps)(EffectByFeature);

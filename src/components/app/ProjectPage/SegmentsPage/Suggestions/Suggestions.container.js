import { connect } from 'react-redux';

import { getSuggestionsBySegmentId, getTargetVariable, getProjectType } from 'state/selectors/projects.selectors';

import Suggestions from './Suggestions';

const mapStateToProps = (state, { segmentId }) => ({
    targetVariable: getTargetVariable(state),
    projectType: getProjectType(state),
    suggestions: getSuggestionsBySegmentId(state, segmentId),
});

export default connect(mapStateToProps)(Suggestions);

import { connect } from 'react-redux';

import { getSegmentsDataFixed, getTargetVariable, getProjectType } from 'state/selectors/projects.selectors';

import SegmentsList from './SegmentsList';

const mapStateToProps = (state) => ({
    segments: getSegmentsDataFixed(state),
    targetVariable: getTargetVariable(state),
    projectType: getProjectType(state),
});

export default connect(mapStateToProps)(SegmentsList);

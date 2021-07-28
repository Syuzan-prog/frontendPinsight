import { connect } from 'react-redux';

import { getSegmentsDataFixed, getProjectType } from 'state/selectors/projects.selectors';

import SegmentsTable from './SegmentsTable';

const mapStateToProps = (state) => ({
    segments: getSegmentsDataFixed(state),
    projectType: getProjectType(state),
});

export default connect(mapStateToProps)(SegmentsTable);

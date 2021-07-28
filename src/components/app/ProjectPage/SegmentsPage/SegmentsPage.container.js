import { connect } from 'react-redux';

import { fetchSuggestions } from 'state/modules/projects';
import { getAreSegmentsLoading, getSegmentsDataFixed } from 'state/selectors/projects.selectors';

import SegmentsPage from './SegmentsPage';

const mapStateToProps = (state) => ({
    segments: getSegmentsDataFixed(state),
    isLoading: getAreSegmentsLoading(state),
});

const mapDispatchToProps = {
    fetchSuggestions,
};

export default connect(mapStateToProps, mapDispatchToProps)(SegmentsPage);

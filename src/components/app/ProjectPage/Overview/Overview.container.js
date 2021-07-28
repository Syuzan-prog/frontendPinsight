import { connect } from 'react-redux';

import { getIsOverviewLoading } from 'state/selectors/projects.selectors';

import Overview from './Overview';

const mapStateToProps = (state) => ({
    isLoading: getIsOverviewLoading(state),
});

export default connect(mapStateToProps)(Overview);

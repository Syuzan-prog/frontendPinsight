import { connect } from 'react-redux';

import { fetchInfo } from 'state/modules/projects';
import { getProjectInfoLoading } from 'state/selectors/projects.selectors';

import InfoPage from './InfoPage';

const mapStateToProps = (state) => ({
    isLoading: getProjectInfoLoading(state),
});

const mapDispatchToProps = {
    fetchInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoPage);

import { connect } from 'react-redux';

import { getDataOverview } from 'state/selectors/projects.selectors';

import DataOverview from './DataOverview';

const mapStateToProps = (state) => ({
    dataOverview: getDataOverview(state),
});

export default connect(mapStateToProps)(DataOverview);

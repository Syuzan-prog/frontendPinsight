import { connect } from 'react-redux';

import { getProjectDrivingFactorsTrimmed } from 'state/selectors/projects.selectors';

import DrivingFactors from './DrivingFactors';

const mapStateToProps = (state) => ({
    drivingFactors: getProjectDrivingFactorsTrimmed(state),
});

export default connect(mapStateToProps)(DrivingFactors);

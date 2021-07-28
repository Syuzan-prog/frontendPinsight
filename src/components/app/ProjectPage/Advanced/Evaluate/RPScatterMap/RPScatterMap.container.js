import { connect } from 'react-redux';

import { getRPScatterMapData } from 'state/selectors/projects.selectors';

import RPScatterMap from './RPScatterMap';

const mapStateToProps = (state) => ({
    data: getRPScatterMapData(state),
});

export default connect(mapStateToProps)(RPScatterMap);

import { connect } from 'react-redux';

import { getEPScatterMapData } from 'state/selectors/projects.selectors';

import EPScatterMap from './EPScatterMap';

const mapStateToProps = (state) => ({
    data: getEPScatterMapData(state),
});

export default connect(mapStateToProps)(EPScatterMap);

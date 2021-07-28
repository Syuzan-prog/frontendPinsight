import { connect } from 'react-redux';

import { getProjectModelHealth } from 'state/selectors/projects.selectors';

import ModelHealth from './ModelHealth';

const mapStateToProps = (state) => ({
    modelHealth: getProjectModelHealth(state),
});

export default connect(mapStateToProps)(ModelHealth);

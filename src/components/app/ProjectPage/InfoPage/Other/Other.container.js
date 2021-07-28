import { connect } from 'react-redux';

import { getProjectOtherData } from 'state/selectors/projects.selectors';

import Other from './Other';

const mapStateToProps = (state) => ({
    data: getProjectOtherData(state),
});

export default connect(mapStateToProps)(Other);

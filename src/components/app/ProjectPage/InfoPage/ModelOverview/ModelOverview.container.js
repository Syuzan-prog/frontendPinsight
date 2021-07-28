import { connect } from 'react-redux';

import { getModelOverview } from 'state/selectors/projects.selectors';

import ModelOverview from './ModelOverview';

const mapStateToProps = (state) => ({
    modelOverview: getModelOverview(state),
});

export default connect(mapStateToProps)(ModelOverview);

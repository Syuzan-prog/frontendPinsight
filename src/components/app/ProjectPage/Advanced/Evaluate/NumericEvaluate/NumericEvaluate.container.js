import { connect } from 'react-redux';

import { fetchEvaluateData } from 'state/modules/projects';

import { getEvaluateIsLoading } from 'state/selectors/projects.selectors';

import NumericEvaluate from './NumericEvaluate';

const mapStateToProps = (state) => ({
    isLoading: getEvaluateIsLoading(state),
});

const mapDispatchToProps = {
    fetchEvaluateData,
};

export default connect(mapStateToProps, mapDispatchToProps)(NumericEvaluate);

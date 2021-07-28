import { connect } from 'react-redux';

import { fetchThreshold } from 'state/modules/projects';
import {
    getEvaluateIsLoading,
    getEvaluateMetaIsLoading,
} from 'state/selectors/projects.selectors';

import CategoricalEvaluate from './CategoricalEvaluate';

const mapStateToProps = (state) => ({
    isLoading: getEvaluateIsLoading(state),
    isMetaLoading: getEvaluateMetaIsLoading(state),
});

const mapDispatchToProps = {
    fetchThreshold,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoricalEvaluate);

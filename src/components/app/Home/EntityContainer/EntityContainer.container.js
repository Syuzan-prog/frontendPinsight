import { connect } from 'react-redux';

import { getProjects, getIsProjectsLoading, getHasMoreProjects } from 'state/selectors/projects.selectors';
import { getPredictions, getIsPredictionsLoading, getHasMorePredictions } from 'state/selectors/predictions.selectors';
import {
    fetchProjects,
    deleteProject,
    updateProject,
    trainProject,
} from 'state/modules/projects';
import {
    fetchPredictions,
    deletePrediction,
    predictPrediction,
    downloadPrediction,
} from 'state/modules/predictions';

import EntityContainer from './EntityContainer';

const mapStateToProps = (state) => ({
    projects: getProjects(state),
    isProjectsLoading: getIsProjectsLoading(state),
    hasMoreProjects: getHasMoreProjects(state),
    predictions: getPredictions(state),
    isPredictionsLoading: getIsPredictionsLoading(state),
    hasMorePredictions: getHasMorePredictions(state),
});

const mapDispatchToProps = {
    fetchProjects,
    deleteProject,
    updateProject,
    trainProject,
    fetchPredictions,
    deletePrediction,
    predictPrediction,
    downloadPrediction,
};

export default connect(mapStateToProps, mapDispatchToProps)(EntityContainer);

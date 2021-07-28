import { connect } from 'react-redux';

import { getProjects, getHasMoreProjects, getIsProjectsLoading } from 'state/selectors/projects.selectors';
import { getDatasources, getHasMoreDatasources, getIsDatasourcesLoading } from 'state/selectors/datasources.selectors';
import { getPredictions, getHasMorePredictions, getIsPredictionsLoading } from 'state/selectors/predictions.selectors';
import { fetchProjects } from 'state/modules/projects';
import { fetchDatasources } from 'state/modules/datasources';
import { fetchPredictions } from 'state/modules/predictions';

import NavList from './NavList';

const mapStateToProps = (state) => ({
    projects: getProjects(state),
    datasources: getDatasources(state),
    predictions: getPredictions(state),
    projectsIsLoading: getIsProjectsLoading(state),
    datasourcesIsLoading: getIsDatasourcesLoading(state),
    predictionsIsLoading: getIsPredictionsLoading(state),
    hasMoreProjects: getHasMoreProjects(state),
    hasMoreDatasources: getHasMoreDatasources(state),
    hasMorePredictions: getHasMorePredictions(state),
});

const mapDispatchToProps = {
    fetchProjects,
    fetchDatasources,
    fetchPredictions,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavList);

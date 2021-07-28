import React, { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import { withModalControls } from 'components/app/Modals';
import { DELETE_ENTITY_MODAL_NAME } from 'constants/modal.constants';
import ScrollActionContainer from 'components/app/ScrollActionContainer';
import { PROJECT_LIST_TAB, PREDICTION_LIST_TAB } from 'constants/dashboard.constants';
import useHorizontalPagination from 'core/hooks/useHorizontalPagination';

import EntityCard from './EntityCard';
import NoData from './NoData';

import useStyles from './EntityContainer.styles';

const EntityContainer = ({
    openModal,
    projects, isProjectsLoading, hasMoreProjects,
    fetchProjects, deleteProject, updateProject, trainProject,
    predictions, isPredictionsLoading, hasMorePredictions,
    fetchPredictions, deletePrediction, predictPrediction, downloadPrediction,
}) => {
    const classes = useStyles();
    const [tab, setTab] = useState(PROJECT_LIST_TAB);

    useEffect(() => {
        setTab(PREDICTION_LIST_TAB);
    }, [predictions.length]);

    useEffect(() => {
        setTab(PROJECT_LIST_TAB);
    }, [projects.length]);

    const handleChangeTab = useCallback((event, newTab) => {
        setTab(newTab);
    }, []);

    const handleProjectDelete = useCallback((id) => {
        openModal(DELETE_ENTITY_MODAL_NAME, {
            id,
            entity: 'project',
            onDelete: deleteProject,
        });
    }, [openModal, deleteProject]);

    const handlePredictionDelete = useCallback((id) => {
        openModal(DELETE_ENTITY_MODAL_NAME, {
            id,
            entity: 'prediction',
            onDelete: deletePrediction,
        });
    }, [openModal, deletePrediction]);

    const listRef = useRef(null);
    const handlePaginationChange = useHorizontalPagination(listRef);

    const isProjectsTab = useMemo(() => tab === PROJECT_LIST_TAB, [tab]);

    const content = useMemo(() => {
        if (isProjectsTab) {
            return (
                projects.length ? (
                    <>
                        {projects.map((project) => (
                            <EntityCard
                                key={project.id}
                                project={project}
                                onDelete={handleProjectDelete}
                                onUpdate={updateProject}
                                onTrain={trainProject}
                                isProjectCard
                            />
                        ))}
                    </>
                ) : <NoData entity="projects" />
            );
        }

        return (
            predictions.length ? (
                <>
                    {predictions.map((prediction) => (
                        <EntityCard
                            key={prediction.id}
                            prediction={prediction}
                            onDelete={handlePredictionDelete}
                            onPredict={predictPrediction}
                            onDownload={downloadPrediction}
                            isProjectCard={false}
                        />
                    ))}
                </>
            ) : <NoData entity="predictions" />
        );
    }, [
        isProjectsTab,
        projects, handleProjectDelete, updateProject, trainProject,
        predictions, handlePredictionDelete, predictPrediction, downloadPrediction,
    ]);

    const hasNoData = useMemo(() => {
        if (isProjectsTab) return projects.length === 0;

        return predictions.length === 0;
    }, [isProjectsTab, projects.length, predictions.length]);

    return (
        <Paper className={classes.container}>
            <div className={classes.barContainer}>
                <Tabs
                    value={tab}
                    textColor="primary"
                    onChange={handleChangeTab}
                    aria-label="prediction and project tabs"
                    classes={{ indicator: classes.indicator }}
                >
                    <Tab
                        label="PROJECTS"
                        value={PROJECT_LIST_TAB}
                        classes={{ selected: classes.selected, wrapper: classes.wrapper, root: classes.barTab }}
                    />
                    <Tab
                        label="PREDICTIONS"
                        value={PREDICTION_LIST_TAB}
                        classes={{ selected: classes.selected, wrapper: classes.wrapper, root: classes.barTab }}
                    />
                </Tabs>
                <div>
                    <KeyboardArrowLeftIcon
                        onClick={() => handlePaginationChange('left')}
                        className={clsx(classes.icon, classes.leftIcon)}
                    />
                    <KeyboardArrowRightIcon
                        className={clsx(classes.icon)}
                        onClick={() => handlePaginationChange('right')}
                    />
                </div>
            </div>
            <ScrollActionContainer
                className={clsx(classes.listContainer, {
                    [classes.noData]: hasNoData,
                })}
                ref={listRef}
                isLoading={isProjectsTab ? isProjectsLoading : isPredictionsLoading}
                onScrollEnd={isProjectsTab ? fetchProjects : fetchPredictions}
                hasMore={isProjectsTab ? hasMoreProjects : hasMorePredictions}
                isHorizontal
            >
                {content}
            </ScrollActionContainer>
        </Paper>
    );
};

EntityContainer.propTypes = {
    openModal: PropTypes.func.isRequired,
    projects: PropTypes.arrayOf(PropTypes.object).isRequired,
    isProjectsLoading: PropTypes.bool.isRequired,
    hasMoreProjects: PropTypes.bool.isRequired,
    fetchProjects: PropTypes.func.isRequired,
    deleteProject: PropTypes.func.isRequired,
    updateProject: PropTypes.func.isRequired,
    trainProject: PropTypes.func.isRequired,
    predictions: PropTypes.arrayOf(PropTypes.object).isRequired,
    isPredictionsLoading: PropTypes.bool.isRequired,
    hasMorePredictions: PropTypes.bool.isRequired,
    fetchPredictions: PropTypes.func.isRequired,
    deletePrediction: PropTypes.func.isRequired,
    predictPrediction: PropTypes.func.isRequired,
    downloadPrediction: PropTypes.func.isRequired,
};

export default withModalControls(EntityContainer);

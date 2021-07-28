import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form';

import {
    PROJECT_FORM_NAME,
    PROJECT_PROJECT_NAME_FIELD_NAME,
    PROJECT_DESCRIPTION_FIELD_NAME,
    PROJECT_PREDICTION_TYPE_FIELD_NAME,
    PROJECT_DATA_FIELD_NAME,
    PROJECT_ID_VARIABLE_FIELD_NAME,
    PROJECT_TARGET_VARIABLE_FIELD_NAME,
    PREDICTION_TYPE_YES_NO,
    PREDICTION_TYPE_NUMBER,
} from 'constants/project.constants';

import { getColorByRatio } from 'core/utils/colorRatio';

export const processNumber = (num) => (Number.isInteger(num) ? String(num) : num.toFixed(2));

const getProjectsState = (state) => state.projects;
const getProjectIdFromProps = (state, props) => props.projectId;

const getProjectsIdMap = createSelector(
    getProjectsState,
    (projects) => projects.idMap
);

const getProjectsEntities = createSelector(
    getProjectsState,
    (projects) => projects.entities
);

export const getProjects = createSelector(
    getProjectsIdMap,
    getProjectsEntities,
    (idMap, entities) => idMap.map((id) => entities[id])
);

export const getProjectsCount = createSelector(
    getProjects,
    (projects) => projects.length
);

export const getHasMoreProjects = createSelector(
    getProjectsState,
    (projects) => projects.hasMore
);

export const getIsProjectsLoading = createSelector(
    getProjectsState,
    (projects) => projects.isLoading
);

export const getConfigureFormInitialValues = createSelector(
    getProjectIdFromProps,
    getProjectsEntities,
    (projectId, projects) => {
        const project = projects[projectId];

        if (!project) return {};

        return {
            projectId,
            [PROJECT_PROJECT_NAME_FIELD_NAME]: project.name,
            [PROJECT_DESCRIPTION_FIELD_NAME]: project.description,
            [PROJECT_PREDICTION_TYPE_FIELD_NAME]: project.type,
            [PROJECT_DATA_FIELD_NAME]: project.datasource.id,
            [PROJECT_ID_VARIABLE_FIELD_NAME]: project.idVar,
            [PROJECT_TARGET_VARIABLE_FIELD_NAME]: project.targetVar,
            defaultOptions: {
                [PROJECT_DATA_FIELD_NAME]: [{ value: project.datasource.id, label: project.datasource.name }],
                [PROJECT_ID_VARIABLE_FIELD_NAME]: [{ value: project.idVar, label: project.idVar }],
                [PROJECT_TARGET_VARIABLE_FIELD_NAME]: [{ value: project.targetVar, label: project.targetVar }],
            },
        };
    }
);

export const getSelectedDatasourceId = (state) => formValueSelector(PROJECT_FORM_NAME)(state, PROJECT_DATA_FIELD_NAME);

const getSelectedProject = createSelector(
    getProjectsState,
    (projects) => projects.selectedProject
);

export const getSelectedProjectId = createSelector(
    getProjectsState,
    (projects) => projects.selectedProject.id
);

export const getAreScoresLoading = createSelector(
    getSelectedProject,
    (selectedProject) => selectedProject.isLoading
);

// for user select
export const getSelectedProjectType = createSelector(
    getProjectsEntities,
    (_, projectId) => projectId,
    (projects, projectId) => projects[projectId]?.type
);

// general selector
export const getProjectType = createSelector(
    getSelectedProject,
    (selectedProject) => selectedProject.type
);

// for user select
export const getSelectedProjectTargetVariable = createSelector(
    getProjectsEntities,
    (_, projectId) => projectId,
    (projects, projectId) => projects[projectId]?.targetVar
);

// general selector
export const getTargetVariable = createSelector(
    getSelectedProject,
    (selectedProject) => selectedProject.targetVariable
);

export const getProjectDrivingFactors = createSelector(
    getSelectedProject,
    (selectedProject) => selectedProject.drivingFactors
);

// TODO: remove this and replace with getProjectDrivingFactors when engine fixes labels
export const getProjectDrivingFactorsTrimmed = createSelector(
    getProjectDrivingFactors,
    (drivingFactors) => drivingFactors.map((factor) => ({
        ...factor,
        name: factor.name.substring(0, 20),
    }))
);

export const getProjectFeatures = createSelector(
    getSelectedProject,
    (selectedProject) => Object.keys(selectedProject.pdp)
);

export const getProjectEffectByFeature = createSelector(
    (state, feature) => feature,
    getSelectedProject,
    (feature, selectedProject) => {
        const scores = selectedProject.pdp[feature];

        if (!scores) return [];

        return scores.x.map((x, index) => ({ x, y: scores.y[index] }));
    }
);

const getSegmentsState = createSelector(
    getSelectedProject,
    (selectedProject) => selectedProject.segments
);

export const getAreSegmentsLoading = createSelector(
    getSegmentsState,
    (segments) => segments.isLoading
);

export const getIsOverviewLoading = createSelector(
    getAreScoresLoading,
    getAreSegmentsLoading,
    (scoresLoading, segmentsLoading) => scoresLoading || segmentsLoading
);

export const getSegmentsData = createSelector(
    getSegmentsState,
    (segments) => segments.data
);

const processCategorical = (segment) => ({
    ...segment,
    percentage: processNumber(segment.percentage),
    accuracy: (segment.accuracy * 100).toFixed(2),
});

const processNumeric = ({ averageTarget, ...segment }) => ({
    ...segment,
    average: processNumber(averageTarget),
    accuracy: (segment.accuracy * 100).toFixed(2),
});

export const getSegmentsDataFixed = createSelector(
    getSegmentsData,
    getProjectType,
    (segments, projectType) => {
        if (!segments) return undefined;

        let processorFn;

        switch (projectType) {
            case PREDICTION_TYPE_YES_NO:
                processorFn = processCategorical;
                break;
            case PREDICTION_TYPE_NUMBER:
                processorFn = processNumeric;
                break;
            default:
                return undefined;
        }

        return segments.map(processorFn);
    }
);

export const getProjectModelHealth = createSelector(
    getSelectedProject,
    (selectedProject) => {
        if (!selectedProject.modelHealth) return null;

        const { accuracy, fairness } = selectedProject.modelHealth;

        if (!accuracy) return null;

        return {
            accuracy: processNumber(accuracy),
            fairness: fairness && processNumber(fairness),
        };
    }
);

const getProjectInfo = createSelector(
    getSelectedProject,
    (selectedProject) => selectedProject.info
);

export const getProjectInfoLoading = createSelector(
    getProjectInfo,
    (info) => info.isLoading
);

export const getModelOverview = createSelector(
    getProjectInfo,
    (info) => info.modelInfo
);

export const getDataOverview = createSelector(
    getProjectInfo,
    (info) => info.dataOverview
);

export const getProjectOtherData = createSelector(
    getProjectInfo,
    (info) => info.projectInfo
);

export const getProjectEvaluate = createSelector(
    getSelectedProject,
    (selectedProject) => selectedProject.evaluate
);

export const getEvaluateIsLoading = createSelector(
    getProjectEvaluate,
    (evaluate) => evaluate.isLoading && !evaluate.isLoaded
);

export const getEvaluateMetaIsLoading = createSelector(
    getProjectEvaluate,
    (evaluate) => evaluate.isLoading && evaluate.isLoaded
);

export const getOptimalThreshold = createSelector(
    getProjectEvaluate,
    (evaluate) => evaluate.optimal
);

export const getThresholdSteps = createSelector(
    getProjectEvaluate,
    (evaluate) => evaluate.all?.map((value) => ({ value }))
);

export const getCurrentThreshold = createSelector(
    getProjectEvaluate,
    (evaluate) => evaluate.currentThreshold
);

const getEvaluationMetrics = createSelector(
    getProjectEvaluate,
    (evaluate) => {
        const { metrics_train: metricsTrain, metrics_test: metricsTest } = evaluate.data;

        if (!metricsTest || !metricsTrain) return {};

        const metrics = {};

        Object.entries(metricsTest).forEach(([key, { label }]) => {
            metrics[label] = [metricsTrain[key].value, metricsTest[key].value];
        });

        return metrics;
    }
);

export const getEvaluationMetricsFixed = createSelector(
    getEvaluationMetrics,
    (metrics) => {
        if (!metrics) return {};

        const processedMetrics = {};

        Object.entries(metrics).forEach(([key, values]) => {
            processedMetrics[key] = values.map((value) => (value ? value.toFixed(4) : '-'));
        });

        return processedMetrics;
    }
);

export const getConfusionMatrix = createSelector(
    getProjectEvaluate,
    (evaluate) => evaluate.data?.conf_matrix
);

export const getRocAucChartData = createSelector(
    getProjectEvaluate,
    (evaluate) => {
        const { roc_auc: rocAuc } = evaluate.data;

        if (!rocAuc) return [];

        const { x, y } = rocAuc;

        return x.map((xValue, index) => ({ x: xValue, y: y[index] }));
    }
);

export const getRocAucThresholdCoordinates = createSelector(
    getProjectEvaluate,
    (evaluate) => {
        const { metrics_train: metricsTrain } = evaluate.data;

        if (!metricsTrain) return {};

        return {
            x: metricsTrain.fpr.value,
            y: metricsTrain.tpr.value,
        };
    }
);

export const getRocAucChartAuc = createSelector(
    getProjectEvaluate,
    (evaluate) => {
        const { metrics_train: metricsTrain } = evaluate.data;

        if (!metricsTrain) return 0;

        return metricsTrain.roc_auc.value;
    }
);

export const getPrecisionRecallCurveChartData = createSelector(
    getProjectEvaluate,
    (evaluate) => {
        const { pr_auc: prAuc } = evaluate.data;

        if (!prAuc) return [];

        const { x, y } = prAuc;

        return x.map((xValue, index) => ({ x: xValue, y: y[index] }));
    }
);

export const getPrecisionRecallThresholdCoordinates = createSelector(
    getProjectEvaluate,
    (evaluate) => {
        const { metrics_train: metricsTrain } = evaluate.data;

        if (!metricsTrain) return {};

        return {
            x: metricsTrain.recall.value,
            y: metricsTrain.precision.value,
        };
    }
);

export const getPrecisionRecallChartAuc = createSelector(
    getProjectEvaluate,
    (evaluate) => {
        const { metrics_train: metricsTrain } = evaluate.data;

        if (!metricsTrain) return 0;

        return metricsTrain.pr_auc.value;
    }
);

export const getLiftChartData = createSelector(
    getProjectEvaluate,
    (evaluate) => {
        const { lift } = evaluate.data;

        if (!lift) return [];

        const { x, y } = lift;

        return x.map((xValue, index) => ({ x: xValue, y: y[index], random: 1 }));
    }
);

export const getGainChartData = createSelector(
    getProjectEvaluate,
    (evaluate) => {
        const { gain } = evaluate.data;

        if (!gain) return [];

        const { x, y } = gain;

        return x.map((xValue, index) => ({ x: xValue, y: y[index], random: (index + 1) * 10 }));
    }
);

const getSuggestionsState = createSelector(
    getSelectedProject,
    (selectedProject) => selectedProject.suggestions
);

export const getAreSuggestionsLoading = createSelector(
    getSuggestionsState,
    (suggestions) => suggestions.isLoading
);

const getSuggestionsData = createSelector(
    getSuggestionsState,
    (suggestions) => suggestions.data
);

export const getSuggestionsBySegmentId = createSelector(
    getSuggestionsData,
    (_, segmentId) => segmentId,
    (suggestions, segmentId) => (suggestions ? suggestions[segmentId] : {})
);

export const getRPSegmentPlotData = createSelector(
    getProjectEvaluate,
    (evaluate) => {
        const { real_bin_vs_pred: rpData } = evaluate.data;

        if (!rpData) return [];

        let min = 0;
        let max = 0;

        rpData.forEach((row) => {
            row.forEach((cell) => {
                if (cell < min) {
                    min = cell;
                } else if (cell > max) {
                    max = cell;
                }
            });
        });

        const basis = max - min;

        const processedData = rpData.map((row) =>
            row.map((cell) => {
                const ratio = (cell - min) / basis;

                return {
                    value: cell,
                    style: {
                        background: getColorByRatio(ratio),
                        color: ratio > 0.25 ? '#ffffff' : '#717171',
                    },
                };
            })
        );

        return processedData;
    }
);

export const getRPScatterMapData = createSelector(
    getProjectEvaluate,
    (evaluate) => {
        const { real_vs_pred: rpData } = evaluate.data;

        if (!rpData) return {};

        const { line: rawLine, scatter: rawScatter } = rpData;

        const line = rawLine.x.map((xValue, index) => ({ x: xValue, y: rawLine.y[index] }));
        const scatter = rawScatter.x.map((xValue, index) => ({ x: xValue, y: rawScatter.y[index] }));

        return { line, scatter };
    }
);

export const getEPScatterMapData = createSelector(
    getProjectEvaluate,
    (evaluate) => {
        const { residual_vs_pred: epData } = evaluate.data;

        if (!epData) return {};

        const { scatter: rawScatter } = epData;

        const scatter = rawScatter.x.map((xValue, index) => ({ x: xValue, y: rawScatter.y[index] }));

        return { scatter };
    }
);

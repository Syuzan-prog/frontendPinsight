import { createSelector } from 'reselect';

import {
    PREDICTION_DATA_FIELD_NAME,
    PREDICTION_DESCRIPTION_FIELD_NAME,
    PREDICTION_NAME_FIELD_NAME,
    PREDICTION_PROJECT_FIELD_NAME,
} from 'constants/prediction.constants';

const getPredictionsState = (state) => state.predictions;

const getEntityIdFromProps = (state, props) => props.entityId;

const getPredictionsIdMap = createSelector(
    getPredictionsState,
    (projects) => projects.idMap
);

const getPredictionsEntities = createSelector(
    getPredictionsState,
    (projects) => projects.entities
);

export const getPredictions = createSelector(
    getPredictionsIdMap,
    getPredictionsEntities,
    (idMap, entities) => idMap.map((id) => entities[id])
);

export const getPredictionById = createSelector(
    getPredictionsEntities,
    getEntityIdFromProps,
    (predictions, entityId) => predictions[entityId]
);

export const getPredictionsCount = createSelector(
    getPredictions,
    (predictions) => predictions.length
);

export const getHasMorePredictions = createSelector(
    getPredictionsState,
    (predictions) => predictions.hasMore
);

export const getIsPredictionsLoading = createSelector(
    getPredictionsState,
    (predictions) => predictions.isLoading
);

export const getPredictionModalInitialValues = createSelector(
    getEntityIdFromProps,
    getPredictionById,
    (predictionId, prediction) => {
        if (!prediction) return {};

        return {
            predictionId,
            [PREDICTION_NAME_FIELD_NAME]: prediction.name,
            [PREDICTION_DESCRIPTION_FIELD_NAME]: prediction.description,
            [PREDICTION_DATA_FIELD_NAME]: prediction.datasource.id,
            [PREDICTION_PROJECT_FIELD_NAME]: prediction.project.id,
            defaultOptions: {
                [PREDICTION_DATA_FIELD_NAME]: [{ value: prediction.datasource.id, label: prediction.datasource.name }],
                [PREDICTION_PROJECT_FIELD_NAME]: [{ value: prediction.project.id, label: prediction.project.name }],
            },
        };
    }
);

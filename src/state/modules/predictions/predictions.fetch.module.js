import { createAction } from 'redux-act';
import { takeLeading, call, put, select } from 'redux-saga/effects';

import * as api from 'core/api';
import { getPredictionsCount } from 'state/selectors/predictions.selectors';

const namespace = 'predictions';

export const fetchPredictions = createAction(
    `${namespace} | fetch`,
    (limit = 10, offset) => ({ limit, offset })
);

export const fetchPredictionsSuccess = createAction(
    `${namespace} | fetch success`,
    (entities, idMap, hasMore) => ({ entities, idMap, hasMore })
);

const fetchPredictionsFail = createAction(
    `${namespace} | fetch fail`,
    (error) => error
);

export const reducer = {
    [fetchPredictions.getType()]: (state) => ({
        ...state,
        isLoading: true,
    }),
    [fetchPredictionsSuccess.getType()]: (state, { entities, idMap, hasMore }) => ({
        ...state,
        entities: { ...state.entities, ...entities },
        idMap: [...state.idMap, ...idMap],
        hasMore,
        isLoading: false,
        isLoaded: true,
    }),
    [fetchPredictionsFail.getType()]: (state, error) => ({
        ...state,
        error,
        isLoading: false,
        isLoaded: false,
    }),
};

function* fetchPredictionsSaga({ payload: { limit, offset } }) {
    const defaultOffset = yield select(getPredictionsCount);
    const { success, data, error } = yield call(api.predictions.getPredictions, limit, offset || defaultOffset);

    if (success) {
        const { payload, count } = data;

        const entities = {};
        const idMap = [];

        payload.forEach((prediction) => {
            entities[prediction.id] = prediction;
            idMap.push(prediction.id);
        });

        yield put(fetchPredictionsSuccess(entities, idMap, (limit + (offset || defaultOffset)) < count));
    } else {
        yield put(fetchPredictionsFail(error));
    }
}

export function* watchPredictionFetch() {
    yield takeLeading(fetchPredictions.getType(), fetchPredictionsSaga);
}

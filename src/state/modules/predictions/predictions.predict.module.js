import { createAction } from 'redux-act';
import { takeEvery, put, call } from 'redux-saga/effects';

import * as api from 'core/api';
import { configurePredictionSuccess } from './predictions.configure.module';

const namespace = 'predictions';

export const predictPrediction = createAction(
    `${namespace} | predict`,
    (predictionId, onSuccess) => ({ predictionId, onSuccess })
);

const predictPredictionFail = createAction(
    `${namespace} | predict fail`,
    (error) => error
);

export const reducer = {
    [predictPrediction.getType()]: (state, { predictionId }) => ({
        ...state,
        entities: { ...state.entities, [predictionId]: { ...state.entities[predictionId], isBusy: true } },
    }),
    [predictPredictionFail.getType()]: (state, { predictionId, error }) => ({
        ...state,
        entities: { ...state.entities, [predictionId]: { ...state.entities[predictionId], isBusy: false } },
        error,
    }),
};

function* predictPredictionSaga({ payload: { predictionId, onSuccess } }) {
    const { success, data, error } = yield call(api.predictions.predictPrediction, predictionId);

    if (success) {
        yield put(configurePredictionSuccess(predictionId, data));
        onSuccess();
    } else {
        yield put(predictPredictionFail(error));
    }
}

export function* watchPredictionPredict() {
    yield takeEvery(predictPrediction.getType(), predictPredictionSaga);
}

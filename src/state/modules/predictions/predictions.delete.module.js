import { createAction } from 'redux-act';
import { takeEvery, put, call } from 'redux-saga/effects';

import * as api from 'core/api';

const namespace = 'predictions';

export const deletePrediction = createAction(
    `${namespace} | delete`,
    (predictionId, deleteConnectedEntities = false, onSuccess) => ({ predictionId, deleteConnectedEntities, onSuccess })
);

const deletePredictionSuccess = createAction(
    `${namespace} | delete success`,
    (predictionId) => predictionId
);

const deletePredictionFail = createAction(
    `${namespace} | delete fail`,
    (error) => error
);

export const reducer = {
    [deletePredictionSuccess.getType()]: (state, { predictionId }) => {
        const entities = { ...state.entities };

        delete entities[predictionId];

        return ({
            ...state,
            entities,
            idMap: state.idMap.filter((id) => id !== predictionId),
        });
    },
};

function* deletePredictionSaga({ payload: { predictionId, onSuccess } }) {
    const { success, error } = yield call(api.predictions.deletePrediction, predictionId);

    if (success) {
        yield put(deletePredictionSuccess(predictionId));
        onSuccess();
    } else {
        yield put(deletePredictionFail(error));
    }
}

export function* watchPredictionDelete() {
    yield takeEvery(deletePrediction.getType(), deletePredictionSaga);
}

import { createAction } from 'redux-act';
import {
    call,
    put,
    takeEvery,
} from 'redux-saga/effects';

import * as api from 'core/api';

const namespace = 'predictions';

export const addPrediction = createAction(
    `${namespace} | add prediction`,
    (formValues) => formValues
);

export const addPredictionSuccess = createAction(
    `${namespace} | add prediction success`,
    (data) => data
);

export const addPredictionFail = createAction(`${namespace} | add prediction fail`);

export const reducer = {
    [addPredictionSuccess.getType()]: (state, data) => ({
        ...state,
        idMap: [data.id, ...state.idMap],
        entities: { ...state.entities, [data.id]: data },
    }),
};

function* addPredictionSaga({ payload: formValues }) {
    const { success, data, error } = yield call(api.predictions.createPrediction, formValues);

    if (success) {
        yield put(addPredictionSuccess(data));
    } else {
        yield put(addPredictionFail(error));
    }
}

export function* watchPredictionAdd() {
    yield takeEvery(addPrediction.getType(), addPredictionSaga);
}

import { createAction } from 'redux-act';
import {
    call,
    put,
    takeEvery,
} from 'redux-saga/effects';
import omit from 'lodash-es/omit';

import { PREDICTION_DATA_FIELD_NAME, PREDICTION_PROJECT_FIELD_NAME } from 'constants/prediction.constants';
import * as api from 'core/api';

const namespace = 'predictions';

export const configurePrediction = createAction(
    `${namespace} | configure prediction`,
    ({ predictionId, ...formValues }) => ({ predictionId, formValues })
);

export const configurePredictionSuccess = createAction(
    `${namespace} | configure prediction success`,
    (predictionId, data) => ({ predictionId, data })
);

export const configurePredictionFail = createAction(`${namespace} | configure prediction fail`);

export const reducer = {
    [configurePredictionSuccess.getType()]: (state, { predictionId, data }) => ({
        ...state,
        entities: { ...state.entities, [predictionId]: { ...state.entities[predictionId], ...data } },
    }),
};

function* configurePredictionSaga({ payload: { predictionId, formValues } }) {
    const body = omit(formValues, [PREDICTION_DATA_FIELD_NAME, PREDICTION_PROJECT_FIELD_NAME]);
    const { success, data, error } = yield call(api.predictions.putPrediction, predictionId, body);

    if (success) {
        yield put(configurePredictionSuccess(predictionId, data));
    } else {
        yield put(configurePredictionFail(error));
    }
}

export function* watchPredictionConfigure() {
    yield takeEvery(configurePrediction.getType(), configurePredictionSaga);
}

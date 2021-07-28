import { createAction } from 'redux-act';
import { takeEvery, put, call } from 'redux-saga/effects';

import * as api from 'core/api';

const namespace = 'predictions';

export const downloadPrediction = createAction(
    `${namespace} | download`,
    (predictionId) => predictionId
);

const downloadPredictionSuccess = createAction(`${namespace} | download success`);

const downloadPredictionFail = createAction(
    `${namespace} | download fail`,
    (error) => error
);

function* downloadPredictionSaga({ payload: predictionId }) {
    const { success, data, error } = yield call(api.predictions.downloadPrediction, predictionId);

    if (success) {
        yield put(downloadPredictionSuccess(data));
        const { uri } = data;
        const downloadLink = document.createElement('a');
        downloadLink.href = uri;
        downloadLink.download = uri.substr(uri.lastIndexOf('/') + 1);
        downloadLink.target = '_blank';
        downloadLink.click();
    } else {
        yield put(downloadPredictionFail(error));
    }
}

export function* watchPredictionDownload() {
    yield takeEvery(downloadPrediction.getType(), downloadPredictionSaga);
}

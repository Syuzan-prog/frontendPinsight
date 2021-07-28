import { createAction } from 'redux-act';
import { all, fork, takeEvery, takeLatest, call, put, select } from 'redux-saga/effects';

import { processThresholdData } from 'core/models/projects';
import * as api from 'core/api';

import { getSelectedProjectId } from '../../selectors/projects.selectors';

const namespace = 'project evaluate';

export const fetchThreshold = createAction(`${namespace} | fetch threshold`);

const fetchThresholdSuccess = createAction(
    `${namespace} | fetch threshold success`,
    (thresholdData) => thresholdData
);

const fetchThresholdFail = createAction(
    `${namespace} | fetch threshold fail`,
    (error) => error
);

export const fetchEvaluateData = createAction(
    `${namespace} | fetch evaluate data`,
    (threshold) => threshold
);

const fetchEvaluateDataSuccess = createAction(
    `${namespace} | fetch evaluate data success`,
    (data) => data
);

const fetchEvaluateDataFail = createAction(
    `${namespace} | fetch evaluate data fail`,
    (error) => error
);

export const reducer = {
    [fetchThreshold.getType()]: (state) => ({
        ...state,
        selectedProject: {
            ...state.selectedProject,
            evaluate: {
                ...state.selectedProject.evaluate,
                isLoading: true,
                isLoaded: false,
            },
        },
    }),
    [fetchThresholdSuccess.getType()]: (state, thresholdData) => ({
        ...state,
        selectedProject: {
            ...state.selectedProject,
            evaluate: {
                ...state.selectedProject.evaluate,
                ...thresholdData,
                isLoading: false,
                isLoaded: true,
            },
        },
    }),
    [fetchThresholdFail.getType()]: (state, error) => ({
        ...state,
        selectedProject: {
            ...state.selectedProject,
            evaluate: {
                ...state.selectedProject.evaluate,
                error,
            },
        },
    }),
    [fetchEvaluateData.getType()]: (state, threshold) => ({
        ...state,
        selectedProject: {
            ...state.selectedProject,
            evaluate: {
                ...state.selectedProject.evaluate,
                currentThreshold: threshold,
                isLoading: true,
            },
        },
    }),
    [fetchEvaluateDataSuccess.getType()]: (state, data) => ({
        ...state,
        selectedProject: {
            ...state.selectedProject,
            evaluate: {
                ...state.selectedProject.evaluate,
                data,
                isLoading: false,
            },
        },
    }),
    [fetchEvaluateDataFail.getType()]: (state, error) => ({
        ...state,
        selectedProject: {
            ...state.selectedProject,
            evaluate: {
                ...state.selectedProject.evaluate,
                error,
            },
        },
    }),
};

function* fetchDataSaga({ payload: threshold }) {
    const projectId = yield select(getSelectedProjectId);
    const { success, data, error } = yield call(api.projects.fetchEvaluateData, projectId, threshold);

    if (success) {
        yield put(fetchEvaluateDataSuccess(data));
    } else {
        yield put(fetchEvaluateDataFail(error));
    }
}

function* fetchThresholdSaga() {
    const projectId = yield select(getSelectedProjectId);
    const { success, data, error } = yield call(api.projects.fetchEvaluateThresholds, projectId);

    if (success) {
        const processedData = processThresholdData(data);

        yield put(fetchThresholdSuccess(processedData));
        yield put(fetchEvaluateData(processedData.optimal));
    } else {
        yield put(fetchThresholdFail(error));
    }
}

function* watchFetchThreshold() {
    yield takeEvery(fetchThreshold.getType(), fetchThresholdSaga);
}

function* watchFetchData() {
    yield takeLatest(fetchEvaluateData.getType(), fetchDataSaga);
}

export function* watchProjectEvaluate() {
    yield all([
        fork(watchFetchThreshold),
        fork(watchFetchData),
    ]);
}

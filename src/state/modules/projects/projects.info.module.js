import { createAction } from 'redux-act';
import { takeLatest, put, call, select } from 'redux-saga/effects';

import * as api from 'core/api';
import { processInfo } from 'core/models/projects';

import { getSelectedProjectId } from '../../selectors/projects.selectors';

const namespace = 'projects';

export const fetchInfo = createAction(`${namespace} | fetch info`);

export const fetchInfoSuccess = createAction(
    `${namespace} | fetch info success`,
    (info) => info
);

const fetchInfoFail = createAction(
    `${namespace} | fetch info fail`,
    (error) => error
);

export const reducer = {
    [fetchInfo.getType()]: (state) => ({
        ...state,
        selectedProject: {
            ...state.selectedProject,
            info: {
                ...state.selectedProject.info,
                isLoading: true,
                isLoaded: false,
            },
        },
    }),
    [fetchInfoSuccess.getType()]: (state, info) => ({
        ...state,
        selectedProject: {
            ...state.selectedProject,
            info: {
                ...state.selectedProject.info,
                ...info,
                isLoading: false,
                isLoaded: true,
            },
        },
    }),
    [fetchInfoFail.getType()]: (state, error) => ({
        ...state,
        selectedProject: {
            ...state.selectedProject,
            info: {
                ...state.selectedProject.info,
                error,
            },
        },
    }),
};

function* fetchInfoSaga() {
    const projectId = yield select(getSelectedProjectId);
    const { success, data, error } = yield call(api.projects.fetchInfo, projectId);

    if (success) {
        yield put(fetchInfoSuccess(processInfo(data)));
    } else {
        yield put(fetchInfoFail(error));
    }
}

export function* watchProjectInfo() {
    yield takeLatest(fetchInfo.getType(), fetchInfoSaga);
}

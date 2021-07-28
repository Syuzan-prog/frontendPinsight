import { createAction } from 'redux-act';
import { takeLatest, put, call, select } from 'redux-saga/effects';

import * as api from 'core/api';
import { processSegments } from 'core/models/projects';

import { getTargetVariable, getProjectType } from '../../selectors/projects.selectors';

const namespace = 'projects';

export const fetchSegments = createAction(`${namespace} | fetch segments`);

export const fetchSegmentsSuccess = createAction(
    `${namespace} | fetch segments success`,
    (segments) => segments
);

const fetchSegmentsFail = createAction(
    `${namespace} | fetch segments fail`,
    (error) => error
);

export const reducer = {
    [fetchSegments.getType()]: (state) => ({
        ...state,
        selectedProject: {
            ...state.selectedProject,
            segments: {
                ...state.selectedProject.segments,
                isLoading: true,
                isLoaded: false,
            },
        },
    }),
    [fetchSegmentsSuccess.getType()]: (state, data) => ({
        ...state,
        selectedProject: {
            ...state.selectedProject,
            segments: {
                ...state.selectedProject.segments,
                data,
                isLoading: false,
                isLoaded: true,
            },
        },
    }),
    [fetchSegmentsFail.getType()]: (state, error) => ({
        ...state,
        selectedProject: {
            ...state.selectedProject,
            segments: {
                ...state.selectedProject.segments,
                error,
            },
        },
    }),
};

function* fetchSegmentsSaga({ payload: projectId }) {
    const { success, data, error } = yield call(api.projects.fetchSegments, projectId);

    if (success) {
        const targetVariable = yield select(getTargetVariable);
        const projectType = yield select(getProjectType);
        yield put(fetchSegmentsSuccess(processSegments(data, projectType, targetVariable)));
    } else {
        yield put(fetchSegmentsFail(error));
    }
}

export function* watchProjectSegments() {
    yield takeLatest(fetchSegments.getType(), fetchSegmentsSaga);
}

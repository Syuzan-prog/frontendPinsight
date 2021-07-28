import { createAction } from 'redux-act';
import { call, put, select, takeEvery } from 'redux-saga/effects';

import * as api from 'core/api';
import { processProjectMeta } from 'core/models/projects';

import { getSelectedProjectTargetVariable, getSelectedProjectType } from '../../selectors/projects.selectors';
import { fetchSegments } from './projects.segments.module';

const namespace = 'projects';

export const selectProject = createAction(
    `${namespace} | select project`,
    (projectId) => projectId
);

export const setTargetVariable = createAction(
    `${namespace} | set target variable`,
    (targetVariable) => targetVariable
);

export const setProjectType = createAction(
    `${namespace} | set project type`,
    (type) => type
);

const fetchProjectMetaSuccess = createAction(
    `${namespace} | fetch project meta success`,
    (projectData) => projectData
);

const fetchProjectMetaFail = createAction(
    `${namespace} | fetch project meta fail`,
    (error) => error
);

export const reducer = {
    [selectProject.getType()]: (state, projectId) => ({
        ...state,
        selectedProject: {
            ...state.selectedProject,
            id: projectId,
            isLoading: true,
            isLoaded: false,
            importance: [],
            pdp: {},
            info: {
                isLoaded: false,
                isLoading: false,
            },
            segments: {
                isLoaded: false,
                isLoading: false,
            },
            suggestions: {
                isLoaded: false,
                isLoading: false,
            },
            evaluate: {
                isLoaded: false,
                isLoading: false,
                optimal: -1,
                data: {},
                error: null,
            },
        },
    }),
    [setTargetVariable.getType()]: (state, targetVariable) => ({
        ...state,
        selectedProject: {
            ...state.selectedProject,
            targetVariable,
        },
    }),
    [setProjectType.getType()]: (state, type) => ({
        ...state,
        selectedProject: {
            ...state.selectedProject,
            type,
        },
    }),
    [fetchProjectMetaSuccess.getType()]: (state, projectData) => ({
        ...state,
        selectedProject: {
            ...state.selectedProject,
            ...projectData,
            isLoading: false,
            isLoaded: true,
        },
    }),
    [fetchProjectMetaFail.getType()]: (state, error) => ({
        ...state,
        selectedProject: {
            ...state.selectedProject,
            isLoading: false,
            isLoaded: false,
            error,
        },
    }),
};

function* fetchProjectSaga(projectId) {
    const { success, data, error } = yield call(api.projects.getProjectMeta, projectId);

    if (success) {
        yield put(fetchProjectMetaSuccess(processProjectMeta(data)));
    } else {
        yield put(fetchProjectMetaFail(error));
    }
}

export function* watchProjectSelect() {
    yield takeEvery(selectProject.getType(), function* selectProjectSaga({ payload: projectId }) {
        const targetVar = yield select(getSelectedProjectTargetVariable, projectId);
        const projectType = yield select(getSelectedProjectType, projectId);

        yield put(setTargetVariable(targetVar));
        yield put(setProjectType(projectType));
        yield put(fetchSegments(projectId));

        yield call(fetchProjectSaga, projectId);
    });
}

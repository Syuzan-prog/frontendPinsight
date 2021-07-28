import { createAction } from 'redux-act';
import { takeEvery, put, call } from 'redux-saga/effects';

import * as api from 'core/api';

const namespace = 'projects';

export const updateProject = createAction(
    `${namespace} | update`,
    (projectId) => projectId
);

export const updateProjectSuccess = createAction(
    `${namespace} | update success`,
    (projectId, data) => ({ projectId, data })
);

const updateProjectFail = createAction(
    `${namespace} | update fail`,
    (error) => error
);

export const reducer = {
    [updateProjectSuccess.getType()]: (state, { projectId, data }) => ({
        ...state,
        entities: { ...state.entities, [projectId]: { ...state.entities[projectId], ...data } },
    }),
};

function* updateProjectSaga({ payload: projectId }) {
    const { success, data, error } = yield call(api.projects.getProject, projectId);

    if (success) {
        yield put(updateProjectSuccess(projectId, data));
    } else {
        yield put(updateProjectFail(error));
    }
}

export function* watchProjectUpdate() {
    yield takeEvery(updateProject.getType(), updateProjectSaga);
}

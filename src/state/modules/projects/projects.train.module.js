import { createAction } from 'redux-act';
import { takeEvery, put, call } from 'redux-saga/effects';

import * as api from 'core/api';
import { updateProjectSuccess } from './projects.update.module';

const namespace = 'projects';

export const trainProject = createAction(
    `${namespace} | train`,
    (projectId, onSuccess) => ({ projectId, onSuccess })
);

const trainProjectFail = createAction(
    `${namespace} | train fail`,
    (projectId, error) => ({ projectId, error })
);

export const reducer = {
    [trainProject.getType()]: (state, { projectId }) => ({
        ...state,
        entities: { ...state.entities, [projectId]: { ...state.entities[projectId], isBusy: true } },
    }),
    [trainProjectFail.getType()]: (state, { projectId, error }) => ({
        ...state,
        entities: { ...state.entities, [projectId]: { ...state.entities[projectId], isBusy: false } },
        error,
    }),
};

function* trainProjectSaga({ payload: { projectId, onSuccess } }) {
    const { success, data, error } = yield call(api.projects.trainProject, projectId);

    if (success) {
        yield put(updateProjectSuccess(projectId, { ...data, isBusy: false }));
        onSuccess();
    } else {
        yield put(trainProjectFail(projectId, error));
    }
}

export function* watchProjectTrain() {
    yield takeEvery(trainProject.getType(), trainProjectSaga);
}

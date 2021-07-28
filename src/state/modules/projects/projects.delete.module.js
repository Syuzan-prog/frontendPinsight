import { createAction } from 'redux-act';
import { takeEvery, put, call } from 'redux-saga/effects';

import * as api from 'core/api';

const namespace = 'projects';

export const deleteProject = createAction(
    `${namespace} | delete`,
    (projectId, deleteConnectedEntities = false, onSuccess) => ({ projectId, deleteConnectedEntities, onSuccess })
);

export const deleteProjectSuccess = createAction(
    `${namespace} | delete success`,
    (projectId, deleteConnectedEntities) => ({ projectId, deleteConnectedEntities })
);

const deleteProjectFail = createAction(
    `${namespace} | delete fail`,
    (error) => error
);

export const reducer = {
    [deleteProjectSuccess.getType()]: (state, { projectId }) => {
        const entities = { ...state.entities };

        delete entities[projectId];

        return ({
            ...state,
            entities,
            idMap: state.idMap.filter((id) => id !== projectId),
        });
    },
};

function* deleteProjectSaga({ payload: { projectId, deleteConnectedEntities, onSuccess } }) {
    const { success, error } = yield call(api.projects.deleteProject, projectId, deleteConnectedEntities);

    if (success) {
        yield put(deleteProjectSuccess(projectId, deleteConnectedEntities));
        onSuccess();
    } else {
        yield put(deleteProjectFail(error));
    }
}

export function* watchProjectDelete() {
    yield takeEvery(deleteProject.getType(), deleteProjectSaga);
}

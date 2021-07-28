import { createAction } from 'redux-act';
import { takeEvery, put, call } from 'redux-saga/effects';

import * as api from 'core/api';

const namespace = 'projects';

export const createProject = createAction(
    `${namespace} | create`,
    (formValues) => formValues
);

export const createProjectSuccess = createAction(
    `${namespace} | create success`,
    (data) => data
);

export const createProjectFail = createAction(
    `${namespace} | create fail`,
    (error) => error
);

export const reducer = {
    [createProjectSuccess.getType()]: (state, data) => ({
        ...state,
        idMap: [data.id, ...state.idMap],
        entities: { ...state.entities, [data.id]: data },
    }),
};

function* createProjectSaga({ payload: body }) {
    const { success, data, error } = yield call(api.projects.createProject, body);

    if (success) {
        yield put(createProjectSuccess(data));
    } else {
        yield put(createProjectFail(error));
    }
}

export function* watchProjectCreate() {
    yield takeEvery(createProject.getType(), createProjectSaga);
}

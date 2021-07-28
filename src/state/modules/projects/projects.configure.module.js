import { createAction } from 'redux-act';
import { takeEvery, put, call } from 'redux-saga/effects';
import omit from 'lodash-es/omit';

import { PROJECT_PREDICTION_TYPE_FIELD_NAME } from 'constants/project.constants';
import * as api from 'core/api';

const namespace = 'projects';

export const configureProject = createAction(
    `${namespace} | configure`,
    ({ projectId, ...formValues }) => ({ projectId, formValues })
);

export const configureProjectSuccess = createAction(
    `${namespace} | configure success`,
    (projectId, data) => ({ projectId, data })
);

export const configureProjectFail = createAction(
    `${namespace} | configure fail`,
    (error) => error
);

export const reducer = {
    [configureProjectSuccess]: (state, { projectId, data }) => ({
        ...state,
        entities: { ...state.entities, [projectId]: { ...state.entities[projectId], ...data } },
    }),
};

function* configureProjectSaga({ payload: { projectId, formValues } }) {
    const body = omit(formValues, [PROJECT_PREDICTION_TYPE_FIELD_NAME]);
    const { success, data, error } = yield call(api.projects.putProject, projectId, body);

    if (success) {
        yield put(configureProjectSuccess(projectId, data));
    } else {
        yield put(configureProjectFail(error));
    }
}

export function* watchProjectConfigure() {
    yield takeEvery(configureProject.getType(), configureProjectSaga);
}

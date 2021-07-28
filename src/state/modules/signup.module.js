import { createAction } from 'redux-act';
import {
    call,
    put,
    takeEvery,
} from 'redux-saga/effects';

import { routes } from 'configs/app.routes';
import history from 'configs/app.history';
import * as api from 'core/api';

const namespace = 'signup';

export const signup = createAction(
    `${namespace} | signup`,
    ({
        email,
        password,
        fullName,
        position,
        company,
    }) => ({
        email,
        password,
        fullName,
        position,
        company,
    })
);

export const signupSuccess = createAction(`${namespace} | signup - success`);

export const signupFail = createAction(
    `${namespace} | signup - fail`,
    (error) => error
);

function* signupSaga({ payload: body }) {
    const { success, error } = yield call(api.auth.signup, body);

    if (success) {
        yield put(signupSuccess());

        yield call(history.push, routes.signupSuccess);
    } else {
        yield put(signupFail(error));
    }
}

export function* watchSignup() {
    yield takeEvery(signup.getType(), signupSaga);
}

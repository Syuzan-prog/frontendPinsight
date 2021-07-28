import { createAction } from 'redux-act';
import {
    call,
    put,
    takeEvery,
} from 'redux-saga/effects';

import * as api from 'core/api';
import { setToken } from 'core/utils/token';
import { routes } from 'configs/app.routes';
import history from 'configs/app.history';

import { init } from './init.module';

const namespace = 'login';

export const login = createAction(
    `${namespace} | login`,
    ({ email, password, persistToken = false }) => ({ email, password, persistToken })
);

export const loginSuccess = createAction(`${namespace} | login - success`);

export const loginFail = createAction(
    `${namespace} | login - fail`,
    (error) => error
);

export function* loginUser(token, persistToken) {
    console.log('tokinLogin', token)
    yield put(loginSuccess());
    yield call(setToken, token, persistToken);
    yield call(history.push, routes.app);
}

function* loginSaga({ payload: { email, password, persistToken } }) {
    const { success, data, error } = yield call(api.auth.login, email, password);

    if (success) {
        const { token } = data;

        yield call(loginUser, token, persistToken);
        yield put(init());
    } else {
        yield put(loginFail(error));
    }
}

export function* watchLogin() {
    yield takeEvery(login.getType(), loginSaga);
}

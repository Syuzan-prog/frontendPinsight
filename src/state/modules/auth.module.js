import { createAction } from 'redux-act';
import { all, fork, take, takeEvery, race, put, call } from 'redux-saga/effects';

import history from 'configs/app.history';
import { routes } from 'configs/app.routes';
import * as tokenUtils from 'core/utils/token';
import { isLandingPath } from 'core/utils/route';
import { fetchAccount, fetchAccountSuccess, fetchAccountFail } from './account';

const namespace = 'authentication';

export const checkAuthentication = createAction(`${namespace} | check authentication`);

export const authenticationValid = createAction(`${namespace} | check authentication valid`);

export const authenticationInvalid = createAction(
    `${namespace} | check authentication invalid`,
    (reason) => reason
);

export const authenticationFail = createAction(
    `${namespace} | check authentication fail`,
    (reason) => reason
);

export const logout = createAction(`${namespace} | logout`);

function* logoutSaga() {
    yield call(tokenUtils.removeToken);

    if (!isLandingPath(history.location.pathname)) {
        yield call(history.push, routes.login);
    }
}

class AuthenticationError extends Error {
    constructor(props) {
        super(...props);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AuthenticationError);
        }

        this.name = 'AuthenticationError';
        this.date = new Date();
    }
}

function* handleError(reason) {
    tokenUtils.removeToken();
    yield put(authenticationInvalid(reason));
}

function* checkAuthenticationSaga() {
    try {
        const token = tokenUtils.getToken();

        if (!token) {
            yield call(handleError, new AuthenticationError('no token'));
            return;
        }

        yield put(fetchAccount());

        const { out, error } = yield race({
            success: take(fetchAccountSuccess.getType()),
            out: take(logout.getType()),
            error: take(fetchAccountFail.getType()),
        });

        if (out) {
            yield call(handleError, new AuthenticationError((out || error).payload));
            return;
        }

        if (error) {
            if (error.payload.isConnectionError) {
                yield put(authenticationFail('cannot fetch account'));
            } else {
                yield call(handleError, new AuthenticationError(error.payload));
            }

            return;
        }

        yield put(authenticationValid());
    } catch (e) {
        yield call(handleError, e);
    }
}

function* watchLogout() {
    yield takeEvery(logout.getType(), logoutSaga);
}

function* watchCheckAuthentication() {
    yield takeEvery(checkAuthentication.getType(), checkAuthenticationSaga);
}

export function* watchAuth() {
    yield all([
        fork(watchLogout),
        fork(watchCheckAuthentication),
    ]);
}

import { createAction } from 'redux-act';
import { call, put, takeEvery } from 'redux-saga/effects';

import * as api from 'core/api';
import { routes } from 'configs/app.routes';

const namespace = 'reset password';

export const resetPassword = createAction(
    `${namespace} | submit`,
    ({ resetToken, password }) => ({ resetToken, password })
);

export const resetPasswordSuccess = createAction(`${namespace} | submit success`);

export const resetPasswordFail = createAction(`${namespace} | submit fail`);

function* resetPasswordSaga({ payload: { password, resetToken } }) {
    const { success, error } = yield call(api.auth.resetPassword, { password }, resetToken);

    if (success) {
        yield put(resetPasswordSuccess());
        window.location = routes.login;
    } else {
        yield put(resetPasswordFail(error));
    }
}

export function* watchResetPassword() {
    yield takeEvery(resetPassword.getType(), resetPasswordSaga);
}

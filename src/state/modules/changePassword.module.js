import { createAction } from 'redux-act';
import { call, put, select, takeEvery } from 'redux-saga/effects';

import * as api from 'core/api';
import { getAccountId } from '../selectors/account.selectors';

const namespace = 'change password';

export const changePassword = createAction(
    `${namespace} | change password`,
    (values) => ({
        password: values.currentPassword,
        newPassword: values.confirmPassword,
        userId: values.userId,
    })
);

export const changePasswordSuccess = createAction(`${namespace} | change password success`);

export const changePasswordFail = createAction(`${namespace} | change password fail`);

function* changePasswordSaga({ payload: { password, newPassword } }) {
    const userId = yield select(getAccountId);
    const { success, error } = yield call(api.account.changePassword, password, newPassword, userId);

    if (success) {
        yield put(changePasswordSuccess());
    } else {
        yield put(changePasswordFail(error));
    }
}

export function* watchChangePassword() {
    yield takeEvery(changePassword.getType(), changePasswordSaga);
}

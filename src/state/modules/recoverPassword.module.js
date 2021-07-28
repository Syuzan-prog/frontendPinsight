import { createAction } from 'redux-act';
import { call, put, takeEvery, select } from 'redux-saga/effects';

import * as api from 'core/api';
import history from 'configs/app.history';
import { routes } from 'configs/app.routes';
import { getIsLoggedIn } from '../selectors/account.selectors';

const namespace = 'recover password';

export const sendResetLink = createAction(
    `${namespace} | send link`,
    (email) => email
);

export const sendResetLinkSuccess = createAction(`${namespace} | send link success`);

export const sendResetLinkFail = createAction(`${namespace} | send link fail`);

function* sendResetLinkSaga({ payload: { email } }) {
    const { success, error } = yield call(api.auth.sendResetLink, email);

    if (success) {
        yield put(sendResetLinkSuccess());

        if (!(yield select(getIsLoggedIn))) {
            history.push(routes.passwordResetSuccess);
        }
    } else {
        yield put(sendResetLinkFail(error));
    }
}

export function* watchSendResetLink() {
    yield takeEvery(sendResetLink.getType(), sendResetLinkSaga);
}

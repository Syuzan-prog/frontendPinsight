import { createAction } from 'redux-act';
import { call, put, select, takeEvery } from 'redux-saga/effects';

import * as api from 'core/api';
import { getAccountId } from 'state/selectors/account.selectors';

const namespace = 'settings account update';

export const accountUpdate = createAction(
    `${namespace} | account update`,
    ({ email, ...update }) => ({ update })
);

export const accountUpdateSuccess = createAction(
    `${namespace} | account update success`,
    (update) => update
);

export const accountUpdateFail = createAction(
    `${namespace} | account update fail`,
    (error) => error
);

export const reducer = {
    [accountUpdateSuccess.getType()]: (state, update) => ({
        ...state,
        ...update,
    }),
    [accountUpdateFail.getType()]: (state, error) => ({
        ...state,
        error,
    }),
};

function* accountUpdateSaga({ payload: { update } }) {
    const userId = yield select(getAccountId);
    const { success, error } = yield call(api.settings.accountUpdate, userId, update);

    if (success) {
        yield put(accountUpdateSuccess(update));
    } else {
        yield put(accountUpdateFail(error));
    }
}

export function* watchUpdateAccount() {
    yield takeEvery(accountUpdate.getType(), accountUpdateSaga);
}

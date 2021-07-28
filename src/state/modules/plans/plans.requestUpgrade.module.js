import { createAction } from 'redux-act';
import { takeEvery, put, call } from 'redux-saga/effects';

import * as api from 'core/api';

const namespace = 'plans';

export const requestPlanUpgrade = createAction(
    `${namespace} | request upgrade`,
    (plan, onSuccess) => ({ plan, onSuccess })
);

const requestPlanUpgradeSuccess = createAction(`${namespace} | request upgrade success`);

const requestPlanUpgradeFail = createAction(
    `${namespace} | request upgrade fail`,
    (error) => error
);

export const reducer = {
    [requestPlanUpgrade.getType()]: (state, { plan }) => ({
        ...state,
        requesting: plan,
    }),
    [requestPlanUpgradeSuccess.getType()]: (state) => ({
        ...state,
        requesting: null,
    }),
    [requestPlanUpgradeFail.getType()]: (state, error) => ({
        ...state,
        requesting: null,
        error,
    }),
};

function* requestPlanUpgradeSaga({ payload: { plan, onSuccess } }) {
    const { success, data, error } = yield call(api.plans.requestPlanUpgrade, plan);

    if (success) {
        yield put(requestPlanUpgradeSuccess(data));
        onSuccess();
    } else {
        yield put(requestPlanUpgradeFail(error));
    }
}

export function* watchRequestPlanUpgrade() {
    yield takeEvery(requestPlanUpgrade.getType(), requestPlanUpgradeSaga);
}

import { createAction } from 'redux-act';
import { takeEvery, call, put } from 'redux-saga/effects';

import * as api from 'core/api';
import { processCurrentPlan } from 'core/models/plans';

const namespace = 'plans';

export const fetchCurrentPlan = createAction(`${namespace} | fetch current plan`);

export const fetchCurrentPlanSuccess = createAction(
    `${namespace} | fetch current plan success`,
    (meta) => meta
);

const fetchCurrentPlanFail = createAction(
    `${namespace} | fetch current plan fail`,
    (error) => error
);

export const reducer = {
    [fetchCurrentPlanSuccess.getType()]: (state, meta) => ({
        ...state,
        meta,
    }),
    [fetchCurrentPlanFail.getType()]: (state, error) => ({
        ...state,
        error,
    }),
};

function* fetchCurrentPlanSaga() {
    const { success, data, error } = yield call(api.plans.fetchCurrent);

    if (success) {
        yield put(fetchCurrentPlanSuccess(processCurrentPlan(data)));
    } else {
        yield put(fetchCurrentPlanFail(error));
    }
}

export function* watchFetchCurrentPlan() {
    yield takeEvery(fetchCurrentPlan.getType(), fetchCurrentPlanSaga);
}

import { createReducer } from 'redux-act';
import { all, fork } from 'redux-saga/effects';

import { reducer as currentPlanReducer, watchFetchCurrentPlan } from './plans.fetch.module';
import { reducer as planUpgradeReducer, watchRequestPlanUpgrade } from './plans.requestUpgrade.module';

export {
    fetchCurrentPlan,
    fetchCurrentPlanSuccess,
} from './plans.fetch.module';

export {
    requestPlanUpgrade,
} from './plans.requestUpgrade.module';

const initialState = {
    meta: null,
    isLoading: false,
    isLoaded: false,
    requesting: null,
    error: null,
};

export const reducer = createReducer({
    ...currentPlanReducer,
    ...planUpgradeReducer,
}, initialState);

export function* watchPlans() {
    yield all([
        fork(watchFetchCurrentPlan),
        fork(watchRequestPlanUpgrade),
    ]);
}

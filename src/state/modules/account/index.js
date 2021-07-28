import { createReducer } from 'redux-act';
import { all, fork } from 'redux-saga/effects';

import { reducer as accountFetchReducer, watchFetchAccount } from './account.fetch.module';
import { reducer as accountUpdateReducer, watchUpdateAccount } from './account.update.module';

export {
    fetchAccount,
    fetchAccountSuccess,
    fetchAccountFail,
} from './account.fetch.module';

export {
    accountUpdate,
    accountUpdateSuccess,
    accountUpdateFail,
} from './account.update.module';

const initialState = {
    account: null,
    isLoading: false,
    isLoaded: false,
    error: '',
};

export const reducer = createReducer({
    ...accountFetchReducer,
    ...accountUpdateReducer,
}, initialState);

export function* watchAccount() {
    yield all([
        fork(watchFetchAccount),
        fork(watchUpdateAccount),
    ]);
}

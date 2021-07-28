import { createReducer } from 'redux-act';
import { all, fork } from 'redux-saga/effects';

import { reducer as createDatasourceReducer, watchDatasourceCreate } from './datasources.create.module';
import { reducer as fetchDatasourceReducer, watchDatasourceFetch } from './datasources.fetch.module';
import { reducer as uploadDatasourceReducer, watchDatasourceUpload } from './datasources.upload.module';
import { reducer as deleteDatasourceReducer, watchDatasourceDelete } from './datasources.delete.module';
import { reducer as selectDatasourceReducer, watchDatasourceSelect } from './datasources.select.module';

export {
    createData,
    createDataSuccess,
    createDataFail,
} from './datasources.create.module';

export {
    fetchDatasources,
    fetchDatasourcesSuccess,
} from './datasources.fetch.module';

export {
    deleteDatasource,
    deleteDatasourceSuccess,
} from './datasources.delete.module';

export {
    selectDatasource,
    fetchDatasourceSchema,
} from './datasources.select.module';

const initialState = {
    entities: {},
    idMap: [],
    meta: {
        progress: null,
    },
    isLoading: false,
    isLoaded: false,
    hasMore: false,
    error: null,
    selectedDatasource: {
        schema: [],
        isLoading: false,
        isLoaded: false,
        hasMore: false,
        error: null,
    },
};

export const reducer = createReducer({
    ...createDatasourceReducer,
    ...fetchDatasourceReducer,
    ...uploadDatasourceReducer,
    ...deleteDatasourceReducer,
    ...selectDatasourceReducer,
}, initialState);

export function* watchDatasources() {
    yield all([
        fork(watchDatasourceCreate),
        fork(watchDatasourceFetch),
        fork(watchDatasourceUpload),
        fork(watchDatasourceDelete),
        fork(watchDatasourceSelect),
    ]);
}

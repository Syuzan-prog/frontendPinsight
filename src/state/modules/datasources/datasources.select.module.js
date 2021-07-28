import { createAction } from 'redux-act';
import { call, put, select, takeEvery } from 'redux-saga/effects';

import { getSelectedDatasourceSchemaRowCount } from 'state/selectors/datasources.selectors';
import * as api from 'core/api';

const namespace = 'datasources';

export const selectDatasource = createAction(
    `${namespace} | select datasource`,
    (datasourceId, limit = 100, offset = null) => ({ datasourceId, limit, offset })
);

export const fetchDatasourceSchema = createAction(
    `${namespace} | fetch datasource schema`,
    (datasourceId, limit = 100, offset = 0) => ({ datasourceId, limit, offset })
);

const fetchDatasourceSchemaSuccess = createAction(
    `${namespace} | fetch schema success`,
    (schema, hasMore) => ({ schema, hasMore })
);

const fetchDatasourceSchemaFail = createAction(
    `${namespace} | fetch schema fail`,
    (error) => error
);

export const reducer = {
    [selectDatasource.getType()]: (state) => ({
        ...state,
        selectedDatasource: {
            ...state.selectedDatasource,
            isLoading: true,
            isLoaded: false,
        },
    }),
    [fetchDatasourceSchemaSuccess.getType()]: (state, { schema, hasMore }) => ({
        ...state,
        selectedDatasource: {
            ...state.selectedDatasource,
            schema,
            isLoading: false,
            isLoaded: true,
            hasMore,
        },
    }),
    [fetchDatasourceSchemaFail.getType()]: (state, error) => ({
        ...state,
        selectDatasource: {
            ...state.selectedDatasource,
            isLoading: false,
            isLoaded: false,
            error,
        },
    }),
};

function* fetchDatasourceSaga({ payload: { datasourceId, limit, offset } }) {
    const defaultOffset = yield select(getSelectedDatasourceSchemaRowCount);
    const { success, data, error } = yield call(
        api.datasources.getDatasourceSchema,
        datasourceId, limit, offset === null ? 0 : defaultOffset
    );

    if (success) {
        const { payload, count } = data;

        const hasMore = (limit + (offset || defaultOffset)) < count;
        yield put(fetchDatasourceSchemaSuccess(payload, hasMore));
    } else {
        yield put(fetchDatasourceSchemaFail(error));
    }
}

export function* watchDatasourceSelect() {
    yield takeEvery([selectDatasource.getType(), fetchDatasourceSchema.getType()], fetchDatasourceSaga);
}

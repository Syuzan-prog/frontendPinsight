import { createAction } from 'redux-act';
import { takeLeading, call, put, select } from 'redux-saga/effects';

import * as api from 'core/api';
import { processDatasources } from 'core/models/datasources';
import { getDatasourcesCount } from 'state/selectors/datasources.selectors';

const namespace = 'datasources';

export const fetchDatasources = createAction(
    `${namespace} | fetch`,
    (limit = 10, offset, resetState = false) => ({ limit, offset, resetState })
);

export const fetchDatasourcesSuccess = createAction(
    `${namespace} | fetch success`,
    (entities, idMap, hasMore, resetState) => ({ entities, idMap, hasMore, resetState })
);

const fetchDatasourcesFail = createAction(
    `${namespace} | fetch fail`,
    (error) => error
);

export const reducer = {
    [fetchDatasources.getType()]: (state) => ({
        ...state,
        isLoading: true,
    }),
    [fetchDatasourcesSuccess.getType()]: (state, { entities, idMap, hasMore, resetState }) => ({
        ...state,
        entities: resetState ? entities : { ...state.entities, ...entities },
        idMap: resetState ? idMap : [...state.idMap, ...idMap],
        hasMore,
        isLoading: false,
        isLoaded: true,
    }),
    [fetchDatasourcesFail.getType()]: (state, error) => ({
        ...state,
        error,
        isLoading: false,
        isLoaded: false,
    }),
};

function* fetchDatasourcesSaga({ payload: { limit, offset, resetState } }) {
    const defaultOffset = yield select(getDatasourcesCount);
    const { success, data, error } = yield call(
        api.datasources.getDatasources,
        limit, offset === null ? defaultOffset : offset
    );

    if (success) {
        const { payload, count } = data;

        const processedPayload = processDatasources(payload);

        const entities = {};
        const idMap = [];

        processedPayload.forEach((datasource) => {
            entities[datasource.id] = datasource;
            idMap.push(datasource.id);
        });

        yield put(fetchDatasourcesSuccess(
            entities,
            idMap,
            (limit + (offset || defaultOffset)) < count,
            resetState
        ));
    } else {
        yield put(fetchDatasourcesFail(error));
    }
}

export function* watchDatasourceFetch() {
    yield takeLeading(fetchDatasources.getType(), fetchDatasourcesSaga);
}

import { createAction } from 'redux-act';
import { takeEvery, put, call } from 'redux-saga/effects';

import * as api from 'core/api';

const namespace = 'datasources';

export const deleteDatasource = createAction(
    `${namespace} | delete`,
    (datasourceId, deleteConnectedEntities = false, onSuccess) => ({ datasourceId, deleteConnectedEntities, onSuccess })
);

export const deleteDatasourceSuccess = createAction(
    `${namespace} | delete success`,
    (datasourceId, deleteConnectedEntities) => ({ datasourceId, deleteConnectedEntities })
);

const deleteDatasourceFail = createAction(
    `${namespace} | delete fail`,
    (error) => error
);

export const reducer = {
    [deleteDatasourceSuccess.getType()]: (state, { datasourceId }) => {
        const entities = { ...state.entities };

        delete entities[datasourceId];

        return ({
            ...state,
            entities,
            idMap: state.idMap.filter((id) => id !== datasourceId),
        });
    },
};

function* deleteDatasourceSaga({ payload: { datasourceId, deleteConnectedEntities, onSuccess } }) {
    const { success, error } = yield call(api.datasources.deleteDatasource, datasourceId, deleteConnectedEntities);

    if (success) {
        yield put(deleteDatasourceSuccess(datasourceId, deleteConnectedEntities));
        onSuccess();
    } else {
        yield put(deleteDatasourceFail(error));
    }
}

export function* watchDatasourceDelete() {
    yield takeEvery(deleteDatasource.getType(), deleteDatasourceSaga);
}

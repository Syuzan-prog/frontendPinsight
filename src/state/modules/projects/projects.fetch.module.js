import { createAction } from 'redux-act';
import { takeLeading, call, put, select } from 'redux-saga/effects';

import * as api from 'core/api';
import { getProjectsCount } from 'state/selectors/projects.selectors';

const namespace = 'projects';

export const fetchProjects = createAction(
    `${namespace} | fetch`,
    (limit = 10, offset) => ({ limit, offset })
);

export const fetchProjectsSuccess = createAction(
    `${namespace} | fetch success`,
    (entities, idMap, hasMore) => ({ entities, idMap, hasMore })
);

const fetchProjectsFail = createAction(
    `${namespace} | fetch fail`,
    (error) => error
);

export const reducer = {
    [fetchProjects.getType()]: (state) => ({
        ...state,
        isLoading: true,
    }),
    [fetchProjectsSuccess.getType()]: (state, { entities, idMap, hasMore }) => ({
        ...state,
        entities: { ...state.entities, ...entities },
        idMap: [...state.idMap, ...idMap],
        hasMore,
        isLoading: false,
        isLoaded: true,
    }),
    [fetchProjectsFail.getType()]: (state, error) => ({
        ...state,
        isLoading: false,
        isLoaded: false,
        error,
    }),
};

function* fetchProjectsSaga({ payload: { limit, offset } }) {
    const defaultOffset = yield select(getProjectsCount);
    const { success, data, error } = yield call(api.projects.getProjects, limit, offset || defaultOffset);

    if (success) {
        const { payload, count } = data;

        const entities = {};
        const idMap = [];

        payload.forEach((project) => {
            entities[project.id] = project;
            idMap.push(project.id);
        });

        yield put(fetchProjectsSuccess(entities, idMap, (limit + (offset || defaultOffset)) < count));
    } else {
        yield put(fetchProjectsFail(error));
    }
}

export function* watchProjectFetch() {
    yield takeLeading(fetchProjects.getType(), fetchProjectsSaga);
}

import { createAction } from 'redux-act';
import { takeLatest, put, call, select } from 'redux-saga/effects';

import * as api from 'core/api';
import { processSuggestions } from 'core/models/projects';

import { getSelectedProjectId } from '../../selectors/projects.selectors';

const namespace = 'projects';

export const fetchSuggestions = createAction(`${namespace} | fetch suggestions`);

export const fetchSuggestionsSuccess = createAction(
    `${namespace} | fetch suggestions success`,
    (suggestions) => suggestions
);

const fetchSuggestionsFail = createAction(
    `${namespace} | fetch suggestions fail`,
    (error) => error
);

export const reducer = {
    [fetchSuggestions.getType()]: (state) => ({
        ...state,
        selectedProject: {
            ...state.selectedProject,
            suggestions: {
                ...state.selectedProject.suggestions,
                isLoading: true,
                isLoaded: false,
            },
        },
    }),
    [fetchSuggestionsSuccess.getType()]: (state, data) => ({
        ...state,
        selectedProject: {
            ...state.selectedProject,
            suggestions: {
                ...state.selectedProject.suggestions,
                data,
                isLoading: false,
                isLoaded: true,
            },
        },
    }),
    [fetchSuggestionsFail.getType()]: (state, error) => ({
        ...state,
        selectedProject: {
            ...state.selectedProject,
            suggestions: {
                ...state.selectedProject.suggestions,
                error,
            },
        },
    }),
};

function* fetchSuggestionsSaga() {
    const projectId = yield select(getSelectedProjectId);
    const { success, data, error } = yield call(api.projects.fetchSuggestions, projectId);

    if (success) {
        yield put(fetchSuggestionsSuccess(processSuggestions(data)));
    } else {
        yield put(fetchSuggestionsFail(error));
    }
}

export function* watchProjectSuggestions() {
    yield takeLatest(fetchSuggestions.getType(), fetchSuggestionsSaga);
}

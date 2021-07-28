import { createReducer } from 'redux-act';
import { all, fork } from 'redux-saga/effects';

import { reducer as createProjectReducer, watchProjectCreate } from './projects.create.module';
import { reducer as configureProjectReducer, watchProjectConfigure } from './projects.configure.module';
import { reducer as fetchProjectsReducer, watchProjectFetch } from './projects.fetch.module';
import { reducer as deleteProjectReducer, watchProjectDelete } from './projects.delete.module';
import { reducer as updateProjectReducer, watchProjectUpdate } from './projects.update.module';
import { reducer as selectProjectReducer, watchProjectSelect } from './projects.select.module';
import { reducer as infoProjectReducer, watchProjectInfo } from './projects.info.module';
import { reducer as segmentsProjectReducer, watchProjectSegments } from './projects.segments.module';
import { reducer as suggestionsProjectReducer, watchProjectSuggestions } from './projects.suggestions.module';
import { reducer as evaluateProjectReducer, watchProjectEvaluate } from './projects.evaluate.module';
import { reducer as trainProjectReducer, watchProjectTrain } from './projects.train.module';
import { reducer as sideEffectsReducer } from './projects.sideEffects.module';

export {
    createProject,
    createProjectSuccess,
    createProjectFail,
} from './projects.create.module';

export {
    configureProject,
    configureProjectSuccess,
    configureProjectFail,
} from './projects.configure.module';

export {
    fetchProjects,
    fetchProjectsSuccess,
} from './projects.fetch.module';

export {
    deleteProject,
    deleteProjectSuccess,
} from './projects.delete.module';

export {
    updateProject,
} from './projects.update.module';

export {
    trainProject,
} from './projects.train.module';

export {
    selectProject,
    setTargetVariable,
    setProjectType,
} from './projects.select.module';

export {
    fetchThreshold,
    fetchEvaluateData,
} from './projects.evaluate.module';

export {
    fetchSegments,
} from './projects.segments.module';

export {
    fetchSuggestions,
} from './projects.suggestions.module';

export {
    fetchInfo,
} from './projects.info.module';

const initialState = {
    entities: {},
    idMap: [],
    isLoading: false,
    isLoaded: true,
    error: null,
    hasMore: true,
    selectedProject: {
        isLoading: false,
        isLoaded: false,
        error: null,
        importance: [],
        pdp: {},
        info: {
            isLoaded: false,
            isLoading: false,
        },
        segments: {
            isLoaded: false,
            isLoading: false,
        },
        suggestions: {
            isLoaded: false,
            isLoading: false,
        },
        evaluate: {
            isLoaded: false,
            isLoading: false,
            optimal: -1,
            data: {},
            error: null,
        },
    },
};

export const reducer = createReducer({
    ...createProjectReducer,
    ...configureProjectReducer,
    ...fetchProjectsReducer,
    ...deleteProjectReducer,
    ...updateProjectReducer,
    ...selectProjectReducer,
    ...infoProjectReducer,
    ...segmentsProjectReducer,
    ...suggestionsProjectReducer,
    ...evaluateProjectReducer,
    ...trainProjectReducer,
    ...sideEffectsReducer,
}, initialState);

export function* watchProjects() {
    yield all([
        fork(watchProjectCreate),
        fork(watchProjectConfigure),
        fork(watchProjectFetch),
        fork(watchProjectDelete),
        fork(watchProjectUpdate),
        fork(watchProjectTrain),
        fork(watchProjectSelect),
        fork(watchProjectInfo),
        fork(watchProjectSegments),
        fork(watchProjectSuggestions),
        fork(watchProjectEvaluate),
    ]);
}

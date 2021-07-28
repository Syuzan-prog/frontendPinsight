import { createReducer } from 'redux-act';
import { all, fork } from 'redux-saga/effects';

import { reducer as fetchPredictionsReducer, watchPredictionFetch } from './predictions.fetch.module';
import { reducer as configurePredictionReducer, watchPredictionConfigure } from './predictions.configure.module';
import { reducer as deletePredictionReducer, watchPredictionDelete } from './predictions.delete.module';
import { reducer as addPredictionReducer, watchPredictionAdd } from './predictions.create.module';
import { reducer as predictPredictionReducer, watchPredictionPredict } from './predictions.predict.module';
import { watchPredictionDownload } from './predictions.download.module';
import { reducer as sideEffectsReducer } from './predictions.sideEffects.module';

export {
    addPrediction,
    addPredictionFail,
    addPredictionSuccess,
} from './predictions.create.module';

export {
    configurePrediction,
    configurePredictionFail,
    configurePredictionSuccess,
} from './predictions.configure.module';

export {
    fetchPredictions,
    fetchPredictionsSuccess,
} from './predictions.fetch.module';

export {
    deletePrediction,
} from './predictions.delete.module';

export {
    predictPrediction,
} from './predictions.predict.module';

export {
    downloadPrediction,
} from './predictions.download.module';

const initialState = {
    entities: {},
    idMap: [],
    isLoading: false,
    isLoaded: true,
    error: null,
    hasMore: true,
};

export const reducer = createReducer({
    ...fetchPredictionsReducer,
    ...configurePredictionReducer,
    ...deletePredictionReducer,
    ...addPredictionReducer,
    ...predictPredictionReducer,
    ...sideEffectsReducer,
}, initialState);

export function* watchPredictions() {
    yield all([
        fork(watchPredictionAdd),
        fork(watchPredictionConfigure),
        fork(watchPredictionFetch),
        fork(watchPredictionDelete),
        fork(watchPredictionPredict),
        fork(watchPredictionDownload),
    ]);
}

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import reducers from './reducers';
import rootSaga from './sagas';
import { init } from './modules/init.module';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

store.dispatch(init());

export default store;

import { createAction, createReducer } from 'redux-act';
import {
    all,
    put,
    race,
    call,
    take,
    takeEvery,
} from 'redux-saga/effects';
import { parse, stringify } from 'query-string';

import history from 'configs/app.history';
import { routes } from 'configs/app.routes';
import { ROUTE_CONNECTION_ERROR } from 'constants/routeErrors.constants';
import * as api from 'core/api';
import * as tokenUtils from 'core/utils/token';
import { isLandingPath } from 'core/utils/route';
import {
    authenticationFail,
    authenticationInvalid,
    authenticationValid,
    checkAuthentication,
    logout,
} from './auth.module';

import {
    fetchDatasources,
    fetchDatasourcesSuccess,
} from './datasources';

import {
    fetchProjects,
    fetchProjectsSuccess,
} from './projects';

import {
    fetchNotifications,
    fetchNotificationsSuccess,
} from './notifications';

import {
    fetchPredictions,
    fetchPredictionsSuccess,
} from './predictions';

import {
    fetchCurrentPlan,
    fetchCurrentPlanSuccess,
} from './plans';

const namespace = 'app';

const initialState = {
    isReady: false,
};

export const init = createAction(`${namespace} | init`);

export const ready = createAction(`${namespace} | ready`);

export const reducer = createReducer({
    [init.getType()]: (state) => ({
        ...state,
        isReady: false,
    }),
    [ready.getType()]: (state) => ({
        ...state,
        isReady: true,
    }),
}, initialState);

const INITIAL_RESOURCE_FETCH_COUNT = 10;

function* initSaga() {
    const { verificationToken, userToken, ...restSearch } = parse(history.location.search);

    if (verificationToken) {
        const { success, data } = yield call(api.auth.verifyEmail, verificationToken);

        if (success) {
            tokenUtils.setToken(data.token);
        }

        history.replace({ search: stringify(restSearch) });
    }

    // if (userToken) {
    //     tokenUtils.setUserToken(userToken);
    // }

    yield put(checkAuthentication());

    const { invalid, failed } = yield race({
        ok: take(authenticationValid.getType()),
        invalid: take(authenticationInvalid.getType()),
        failed: take(authenticationFail.getType()),
    });

    if (invalid) {
        yield put(logout());
        yield put(ready());
    } else if (failed) {
        yield put(ready());
        history.replace({ state: { errorType: ROUTE_CONNECTION_ERROR } });
    } else {
        yield put(fetchDatasources(INITIAL_RESOURCE_FETCH_COUNT));
        yield put(fetchProjects(INITIAL_RESOURCE_FETCH_COUNT));
        yield put(fetchPredictions(INITIAL_RESOURCE_FETCH_COUNT));
        yield put(fetchNotifications(INITIAL_RESOURCE_FETCH_COUNT));
        yield put(fetchCurrentPlan());

        yield all([
            take(fetchDatasourcesSuccess.getType()),
            take(fetchProjectsSuccess.getType()),
            take(fetchPredictionsSuccess.getType()),
            take(fetchNotificationsSuccess.getType()),
            take(fetchCurrentPlanSuccess.getType()),
        ]);

        yield put(ready());

        if (isLandingPath(history.location.pathname)) {
            yield call(history.replace, routes.app);
        }
    }
}

export function* watchInit() {
    yield takeEvery(init.getType(), initSaga);
}

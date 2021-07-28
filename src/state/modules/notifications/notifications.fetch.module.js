import { createAction } from 'redux-act';
import { takeLeading, call, put, select } from 'redux-saga/effects';

import * as api from 'core/api';
import { processNotifications } from 'core/models/notifications';
import { getNotificationsCount } from 'state/selectors/notifications.selectors';

const namespace = 'notifications';

export const fetchNotifications = createAction(
    `${namespace} | fetch`,
    (limit = 10, offset) => ({ limit, offset })
);

export const fetchNotificationsSuccess = createAction(
    `${namespace} | fetch success`,
    (notifications, hasMore, unreadCount) => ({ notifications, hasMore, unreadCount })
);

const fetchNotificationsFail = createAction(
    `${namespace} | fetch fail`,
    (error) => error
);

export const reducer = {
    [fetchNotifications.getType()]: (state) => ({
        ...state,
        isLoading: true,
    }),
    [fetchNotificationsSuccess.getType()]: (state, { notifications, hasMore, unreadCount }) => ({
        ...state,
        notifications: [...state.notifications, ...notifications],
        hasMore,
        isLoading: false,
        isLoaded: true,
        unreadCount,
    }),
    [fetchNotificationsFail.getType()]: (state, error) => ({
        ...state,
        isLoading: false,
        isLoaded: false,
        error,
    }),
};

function* fetchNotificationsSaga({ payload: { limit, offset } }) {
    const defaultOffset = yield select(getNotificationsCount);
    const { success, data, error } = yield call(api.notifications.getNotifications, limit, offset || defaultOffset);

    if (success) {
        const { payload, count, unreadCount } = data;

        yield put(fetchNotificationsSuccess(
            processNotifications(payload),
            (limit + (offset || defaultOffset)) < count, unreadCount)
        );
    } else {
        yield put(fetchNotificationsFail(error));
    }
}

export function* watchNotificationFetch() {
    yield takeLeading(fetchNotifications.getType(), fetchNotificationsSaga);
}

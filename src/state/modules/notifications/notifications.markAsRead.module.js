import { createAction } from 'redux-act';
import {
    actionChannel,
    delay,
    flush,
    fork,
    call,
    put,
    take,
} from 'redux-saga/effects';

import * as api from 'core/api';

const namespace = 'notifications';

export const markAsRead = createAction(
    `${namespace} | mark as read`,
    (notificationId) => notificationId
);

const markAsReadSuccess = createAction(`${namespace} | mark as read success`);

const markAsReadFail = createAction(
    `${namespace} | mark as read fail`,
    (error) => error
);

export const reducer = {
    [markAsRead.getType()]: (state, notificationId) => ({
        ...state,
        notifications: state.notifications.map((notification) => {
            if (notificationId === notification.id) {
                return {
                    ...notification,
                    isRead: true,
                };
            }

            return notification;
        }),
        unreadCount: state.unreadCount - 1,
    }),
};

function* markAsReadSaga(notificationIds) {
    const { success, error } = yield call(api.notifications.markAsRead, notificationIds);

    if (success) {
        yield put(markAsReadSuccess());
    } else {
        yield put(markAsReadFail(error));
    }
}

export function* watchMarkAsRead() {
    const markAsReadChannel = yield actionChannel(markAsRead.getType());

    while (true) {
        const leadingAction = yield take(markAsReadChannel);

        yield delay(1000);

        const actions = yield flush(markAsReadChannel);

        yield fork(markAsReadSaga, [leadingAction, ...actions].map((action) => action.payload));
    }
}

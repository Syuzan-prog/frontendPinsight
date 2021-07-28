import { createReducer } from 'redux-act';
import { all, fork } from 'redux-saga/effects';

import { reducer as fetchNotificationsReducer, watchNotificationFetch } from './notifications.fetch.module';
import { reducer as markAsReadReducer, watchMarkAsRead } from './notifications.markAsRead.module';

export {
    fetchNotifications,
    fetchNotificationsSuccess,
} from './notifications.fetch.module';

export {
    markAsRead,
} from './notifications.markAsRead.module';

const initialState = {
    notifications: [],
    isLoading: false,
    isLoaded: true,
    error: null,
    hasMore: true,
    unreadCount: 0,
};

export const reducer = createReducer({
    ...fetchNotificationsReducer,
    ...markAsReadReducer,
}, initialState);

export function* watchNotifications() {
    yield all([
        fork(watchNotificationFetch),
        fork(watchMarkAsRead),
    ]);
}

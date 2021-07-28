import { createSelector } from 'reselect';

const getNotificationsState = (state) => state.notifications;

export const getNotifications = createSelector(
    getNotificationsState,
    (notifications) => notifications.notifications
);

export const getNotificationsCount = createSelector(
    getNotifications,
    (notifications) => notifications.length
);

export const getHasMoreNotifications = createSelector(
    getNotificationsState,
    (notifications) => notifications.hasMore
);

export const getIsNotificationsLoading = createSelector(
    getNotificationsState,
    (notifications) => notifications.isLoading
);

export const getUnreadNotificationCount = createSelector(
    getNotificationsState,
    (notifications) => notifications.unreadCount
);

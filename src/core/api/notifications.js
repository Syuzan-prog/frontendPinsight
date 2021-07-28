import { getApiRequest, putApiRequest } from './_tools';
import { notifications as routes } from './routes';

export const getNotifications = (limit, offset) =>
    getApiRequest(routes.list(), { query: { limit, offset, 'filter[isPush]': true } });
export const markAsRead = (notificationIds) => putApiRequest(routes.markAsRead(), {
    activityIds: notificationIds,
    markAll: false,
});

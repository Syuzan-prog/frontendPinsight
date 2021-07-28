export const processNotifications = (notifications) => notifications.map((notification) => ({
    ...notification,
    createdAt: new Date(notification.createdAt),
}));

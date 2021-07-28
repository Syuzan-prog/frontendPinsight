import { connect } from 'react-redux';

import { fetchNotifications, markAsRead } from 'state/modules/notifications';
import {
    getNotifications,
    getIsNotificationsLoading,
    getUnreadNotificationCount,
    getHasMoreNotifications,
} from 'state/selectors/notifications.selectors';

import NotificationMenu from './NotificationMenu';

const mapStateToProps = (state) => ({
    notifications: getNotifications(state),
    isLoading: getIsNotificationsLoading(state),
    newNotificationCount: getUnreadNotificationCount(state),
    hasMore: getHasMoreNotifications(state),
});

const mapDispatchToProps = {
    fetchNotifications,
    markAsRead,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationMenu);

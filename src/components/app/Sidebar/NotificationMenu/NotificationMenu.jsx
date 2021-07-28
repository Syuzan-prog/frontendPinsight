import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import ReactTimeAgo from 'react-time-ago';

import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

import ScrollActionContainer from 'components/app/ScrollActionContainer';
import useBooleanFlagToggle from 'core/hooks/useBooleanFlagToggle';

import useStyles from './NotificationMenu.styles';

const NotificationMenu = ({
    notifications, newNotificationCount, fetchNotifications, markAsRead, hasMore, isLoading,
}) => {
    const [isOpen, onOpenMenu, onCloseMenu] = useBooleanFlagToggle();
    const anchorRef = useRef();

    const classes = useStyles();

    const handleMouseOver = useCallback((isRead, notificationId) => {
        if (isRead) return;

        markAsRead(notificationId);
    }, [markAsRead]);

    return (
        <>
            <div className={clsx(classes.notifications, 'pointer')} onClick={onOpenMenu} ref={anchorRef}>
                <div className={clsx(classes.iconContainer, {
                        [classes.notificationBadge]: !!newNotificationCount,
                    })}
                >
                    <NotificationsNoneIcon className={classes.notificationIcon} />
                </div>
                <Typography variant="subtitle2" className={classes.label}>Notifications</Typography>
            </div>
            <Menu
                id="notification-menu"
                anchorEl={anchorRef?.current}
                classes={{
                    list: classes.menu,
                }}
                keepMounted
                open={isOpen}
                onClose={onCloseMenu}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <div className={classes.header}>
                    <Typography variant="body1" component="span" className={classes.headerTitle}>Notifications</Typography>
                    <div className={classes.newNotificationCountContainer}>{newNotificationCount}</div>
                </div>
                <ScrollActionContainer
                    isLoading={isLoading}
                    onScrollEnd={fetchNotifications}
                    hasMore={hasMore}
                    className={classes.notificationList}
                >
                    {notifications.length
                        ? (
                            notifications.map(({ id, action, message, createdAt, isRead }) => (
                                // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
                                <div
                                    key={`notification-${id}`}
                                    className={clsx(classes.notification, { unread: !isRead })}
                                    onMouseOver={() => handleMouseOver(isRead, id)}
                                >
                                    <Typography variant="body1" color="textPrimary">{action}</Typography>
                                    <Typography variant="body2" color="textSecondary">{message}</Typography>
                                    <Typography variant="caption" className={classes.timestamp}>
                                        <ReactTimeAgo date={createdAt} local="en-US" timeStyle="mini-minute-now" />
                                    </Typography>
                                </div>
                            ))
                        )
                        : (
                            <Typography
                                component="div"
                                variant="body2"
                                color="textSecondary"
                                className={classes.noNotificationsText}
                            >
                                There are no notifications yet!
                            </Typography>
                    )}
                </ScrollActionContainer>
            </Menu>
        </>
    );
};

NotificationMenu.propTypes = {
    notifications: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        action: PropTypes.string,
        message: PropTypes.string,
        createdAt: PropTypes.date,
        isRead: PropTypes.bool,
    })),
    newNotificationCount: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    hasMore: PropTypes.bool.isRequired,
    fetchNotifications: PropTypes.func.isRequired,
    markAsRead: PropTypes.func.isRequired,
};

export default NotificationMenu;

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    label: {
        color: theme.sidebar.text.main,
        marginLeft: '34px',
    },
    notifications: {
        display: 'flex',
        paddingLeft: '28px',
        alignItems: 'center',
        height: '50px',
        '&:hover': {
            backgroundColor: theme.sidebar.bgHover,
        },
    },
    iconContainer: {
        position: 'relative',
    },
    notificationBadge: {
        '&:after': {
            content: '""',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            position: 'absolute',
            top: '-1px',
            right: '-1px',
            backgroundColor: theme.sidebar.text.active,
        },
    },
    notificationIcon: {
        fill: theme.sidebar.text.main,
    },
    menu: {
        height: 324,
        width: 260,
        padding: 0,
        overflow: 'hidden',
    },
    header: {
        height: 48,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.palette.primary.main,
        padding: '0 16px',
    },
    headerTitle: {
        color: theme.palette.success.contrastText,
    },
    newNotificationCountContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.contrastText,
        height: 24,
        padding: '0 8px',
        borderRadius: '50px',
    },
    notificationList: {
        height: 'calc(100% - 48px)',
        overflowY: 'auto',
    },
    noNotificationsText: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    notification: {
        height: 64,
        padding: '14px 16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        '&:not(:last-child)': {
            borderBottom: '0.4px solid rgba(0, 0, 0, 0.54)',
        },
        '&.unread': {
            backgroundColor: 'rgba(85, 85, 206, 0.08)',
        },
        '& span, p': {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
    },
    timestamp: {
        color: theme.palette.text.disabled,
    },
}));

export default useStyles;

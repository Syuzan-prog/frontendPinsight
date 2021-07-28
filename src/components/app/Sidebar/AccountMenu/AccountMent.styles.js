import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    label: {
        color: theme.sidebar.text.main,
        marginLeft: '24px',
    },
    info: {
        display: 'flex',
        paddingLeft: '20px',
        alignItems: 'center',
        marginTop: '16px',
        height: '50px',
        '&:hover': {
            backgroundColor: theme.sidebar.bgHover,
        },
    },
    avatarContainer: {
        minWidth: '40px',
        minHeight: '40px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.sidebar.text.main,
    },
    noAvatarIcon: {
        fill: theme.sidebar.bgHover,
    },
    menuIcon: {
        color: 'rgba(0, 0, 0, 0.54)',
        marginRight: 12,
    },
}));

export default useStyles;

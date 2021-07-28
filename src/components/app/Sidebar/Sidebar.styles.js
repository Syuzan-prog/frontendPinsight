import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 255;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        backgroundColor: theme.sidebar.bg,
        overflowX: 'hidden',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        backgroundColor: theme.sidebar.bg,
        overflowX: 'hidden',
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: '80px!important',
        backgroundColor: theme.sidebar.bg,
    },
    logoContainer: {
        paddingLeft: '16px',
        display: 'flex',
        flexDirection: 'row',
        marginTop: '29px',
    },
    logo: {
        marginLeft: '6.6px',
    },
    logoName: {
        fontFamily: 'Roboto, sans-serif',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '24px',
        lineHeight: '32px',
        color: theme.palette.primary.contrastText,
        marginLeft: '32px',
    },
    account: {
        marginTop: 'auto',
        marginBottom: '36px',
    },
}));

export default useStyles;

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    menuContainer: {
        width: '138px',
        height: 'auto',
        padding: '15px 0',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        overflow: 'hidden',
        boxShadow: '0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px rgba(0, 0, 0, 0.14), 0 1px 18px rgba(0, 0, 0, 0.12)',
        background: '#FFFFFF',
    },
    menuList: {
        padding: 0,
        width: '100%',
    },
    menuItemIcon: {
        fill: theme.palette.text.secondary,
    },
    menuItemText: {
        marginLeft: '11px',
        lineHeight: '20px',
        color: theme.palette.text.primary,
    },
}));

export default useStyles;

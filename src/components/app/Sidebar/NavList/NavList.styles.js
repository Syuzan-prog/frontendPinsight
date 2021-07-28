import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    list: {
        marginTop: '120px',
    },
    listItem: {
        paddingLeft: '27px',
        cursor: 'pointer',
    },
    listItemText: {
        color: theme.sidebar.text.main,
    },
    iconColor: {
        fill: theme.sidebar.text.main,
    },
    activeIcon: {
        fill: theme.sidebar.text.active,
    },
    activeText: {
        color: theme.sidebar.text.active,
    },
    nestedList: {
        maxHeight: 192,
        overflowY: 'auto',
    },
    nestedListItem: {
        paddingLeft: 84,
        color: theme.sidebar.text.main,
        '&:hover': {
            color: theme.palette.primary.contrastText,
            background: theme.sidebar.bgHover,
        },
        '& span': {
            maxWidth: '155px',
            textOverflow: 'ellipsis',
            overflowX: 'hidden',
            whiteSpace: 'nowrap',
        },
        '&.inactive': {
            color: theme.palette.primary.light,
            background: 'none',
            cursor: 'not-allowed',
        },
    },
    loadMore: {
        height: 48,
        display: 'flex',
        cursor: 'pointer',
        '&.loading': {
            cursor: 'default',
        },
    },
    progress: {
        color: `${theme.sidebar.text.main} !important`,
    },
}));

export default useStyles;

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: 'calc(100% - 48px)',
        padding: '20px 24px',
        marginTop: '24px',
    },
    barTab: {
        ...theme.typography.overline,
        fontStyle: 'normal',
        fontWeight: 'normal',
        lineHeight: '17px',
        textAlign: 'center',
        minWidth: '85px',
        minHeight: '31px',
    },
    selected: {
        padding: '7px 10px',
        background: theme.palette.secondary.main,
        color: `${theme.palette.primary.contrastText}!important`,
        boxShadow: '0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.14), 0 1px 3px rgba(0, 0, 0, 0.12);',
        borderRadius: '16px',
        border: 'none',
    },
    indicator: {
        display: 'none',
    },
    wrapper: {
        width: 'fit-content',
        lineHeight: '16px',
    },
    listContainer: {
        height: 270,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        overflowX: 'scroll',
        overflowY: 'hidden',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
        scrollbarWidth: 'none',
        '-ms-overflow-style': 'none',
        paddingLeft: 2,
        '&:after': {
            visibility: 'hidden',
            content: '|',
        },
    },
    noData: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    barContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
    },
    icon: {
        fill: theme.palette.text.secondary,
        cursor: 'pointer',
    },
    leftIcon: {
        marginRight: '42px',
        fill: theme.palette.text.secondary,
    },
}));

export default useStyles;

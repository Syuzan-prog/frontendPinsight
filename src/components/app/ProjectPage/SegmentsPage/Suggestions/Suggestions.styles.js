import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    questionList: {
        display: 'flex',
        widht: '150px',
        alignItems: 'center',
        flexWrap: 'wrap',
        position: 'relative',
        margin: '0 8px',
        cursor: 'pointer',
    },
    questionOption: {
        fontWeight: 400,
        fontStyle: 'normal',
        fontSize: '12px',
        lineHeight: '19px',
        letterSpacing: '0.1px',
    },
    greyText: {
        color: theme.palette.text.secondary,
    },
    list: {
        position: 'absolute',
        width: '102px',
        background: '#FFFFFF',
        boxShadow: '0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px rgba(0, 0, 0, 0.14), 0 1px 18px rgba(0, 0, 0, 0.12)',
        borderRadius: '4px',
        top: '30px',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: 'calc(100% - 48px)',
        padding: '20px 24px',
        marginTop: '24px',
    },
    listContainer: {
        display: 'flex',
        flexDirection: 'row',
        minHeight: '150px',
        alignItems: 'start',
        overflowX: 'scroll',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
        scrollbarWidth: 'none',
        '-ms-overflow-style': 'none',
    },
    barContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
        '& > div': {
            display: 'flex',
            alignItems: 'center',
        },
    },
    icon: {
        fill: theme.palette.text.secondary,
        cursor: 'pointer',
    },
    leftIcon: {
        marginRight: '42px',
        fill: theme.palette.text.secondary,
    },
    root: {
        minWidth: '196px',
        background: theme.palette.primary.contrastText,
        boxShadow: 'none',
        borderRadius: '4px',
        marginRight: '16px',
    },
    captionBold: {
        fontWeight: 700,
    },
    cardHeader: {
        padding: 0,
        marginTop: '30px',
    },
    titleContainer: {
        display: 'flex',
        alignItems: 'center',
        padding: '13px 0 16px 16px',
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: '16px',
        '& > div': {
            display: 'flex',
            flexDirection: 'row',
        },
    },
    noResults: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        alignSelf: 'center',
    },
}));

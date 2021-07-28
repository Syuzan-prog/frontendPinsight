import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: 'calc(100% - 48px)',
        padding: '20px 24px',
    },
    listContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: '150px',
        alignItems: 'center',
        overflowX: 'scroll',
        overflowY: 'hidden',
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
        minWidth: '250px',
        height: '129px',
        background: theme.palette.primary.contrastText,
        boxShadow: '0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.14), 0 1px 3px rgba(0, 0, 0, 0.12)',
        borderRadius: '4px',
        marginRight: '16px',
        borderTop: `3px solid ${theme.palette.primary.main}`,
        position: 'relative',
        cursor: 'pointer',
    },
    headerTitle: {
        fontStyle: 'normal',
        color: theme.palette.text.secondary,
        lineHeight: '32px',
    },
    cardHeader: {
        padding: 0,
    },
    titleContainer: {
        display: 'flex',
        alignItems: 'center',
        padding: '13px 0 16px 16px',
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: '0 10px',
        '& > div': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '68px',
        },
    },
    count: {
        textAlign: 'center',
        color: '#003C64',
        lineHeight: 1.5,
    },
    accuracy: {
        textAlign: 'center',
        color: '#6D3C00',
        lineHeight: 1.5,
    },
    target: {
        textAlign: 'center',
        color: '#07471B',
        lineHeight: 1.5,
        overflow: 'hidden',
        maxWidth: 80,
        textOverflow: 'ellipsis',
    },
    selectedSegmentContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '24px',
    },
    selectedSegmentOverlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(0deg, rgba(85, 85, 206, 0.08), rgba(85, 85, 206, 0.08))',
    },
    selectedCard: {
        border: '1px solid #6564C4',
        borderTop: `3px solid ${theme.palette.primary.main}`,
    },
    selectedSegmentText: {
        fontWeight: 500,
        fontStyle: 'normal',
        fontSize: '14px',
        lineHeight: '22px',
        letterSpacing: '0.1px',
        color: theme.palette.text.secondary,
        marginRight: '4px',
    },
}));

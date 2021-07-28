import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 210,
        height: 237,
        background: theme.palette.primary.contrastText,
        boxShadow: '0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.14), 0 1px 3px rgba(0, 0, 0, 0.12)',
        borderRadius: '4px',
        marginRight: '16px',
        padding: '10px 20px',
        borderTop: `3px solid ${theme.palette.primary.border}`,
    },
    activeBorder: {
        borderTop: `3px solid ${theme.palette.primary.main}`,
    },
    headerTitle: {
        fontStyle: 'normal',
        color: theme.palette.text.primary,
        lineHeight: '32px',
    },
    cardHeader: {
        padding: 0,
    },
    titleContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    headerSub: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        color: theme.palette.text.secondary,
        lineHeight: '20px',
        fontSize: '12px',
        wordBreak: 'keep-all',
        whiteSpace: 'nowrap',
        overflowX: 'hidden',
        textOverflow: 'ellipsis',
        letterSpacing: '0.4px',
        width: '170px',
        minHeight: 20,
    },
    calendarIcon: {
        width: '9px',
        height: '10px',
        fill: 'rgba(0, 0, 0, 0.38)',
    },
    cardContent: {
        padding: '0',
    },
    infoContainer: {
        display: 'flex',
        alignItems: 'center',
        height: '18px',
    },
    date: {
        lineHeight: '17px',
        fontStyle: 'normal',
        fontWeight: 'normal',
        color: theme.palette.text.hint,
        marginLeft: '12px',
    },
    dot: {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        background: 'rgba(0, 0, 0, 0.38)',
        marginRight: '20px',
    },
    infoContainerText: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '12px',
        LineHeight: '20px',
        letterSpacing: '0.4px',
        color: 'rgba(0, 0, 0, 0.38)',
    },
    progressBar: {
        background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.12)), #FFFFFF',
        borderRadius: '31px',
        marginTop: '4px',
    },
    loadColor: {
        background: theme.palette.secondary.main,
    },
    completedColor: {
        background: theme.palette.primary.main,
    },
    activeTextColor: {
        color: `${theme.palette.secondary.main}!important`,
    },
    completeTextColor: {
        color: `${theme.palette.primary.main}!important`,
    },
    failedTextColor: {
        color: `${theme.palette.error.main}!important`,
    },
    startTrainingButton: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
    },
    trainingButton: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        opacity: '0.4',
        pointerEvents: 'none',
    },
    completedButton: {
        color: theme.palette.primary.light,
        backgroundColor: theme.palette.primary.contrastText,
    },
    downloadButton: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.secondary.main,
    },
    viewIcon: {
        marginRight: '9px',
        fill: theme.palette.primary.light,
    },
    arrowDown: {
        marginRight: '9px',
        width: '21px',
        height: '21px',
    },
    cardLoader: {
        marginRight: '8px',
        color: '#fff',
    },
    cardButton: {
        marginTop: '6px',
    },
    toolTip: {
        maxWidth: '240px',
        padding: '10px 14px',
        background: theme.palette.primary.contrastText,
        fontStyle: 'normal',
        fontWeight: 'normal',
        letterSpacing: '0.4px',
        lineHeight: '20px',
        fontSize: '12px',
        color: theme.palette.text.secondary,
        boxShadow: '0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.14), 0 1px 3px rgba(0, 0, 0, 0.12)',
    },
}));

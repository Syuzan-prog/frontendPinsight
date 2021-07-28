import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '360px',
        padding: '20px 24px',
        cursor: 'not-allowed',
    },
    overlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'rgba(255,255,255,0.74)',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 4,
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
    greyText: {
        color: theme.palette.text.secondary,
    },
    resetText: {
        marginLeft: '5px',
    },
    percentBlock: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    percentTextBig: {
        color: theme.palette.text.primary,
        display: 'inline-block',
    },
    percentIcon: {
        color: theme.palette.success.main,
        display: 'inline-block',
        margin: '0px 10px',
        position: 'relative',
        top: '6px',
    },
    percentTextSmall: {
        color: theme.palette.success.main,
        display: 'inline-block',
    },
    percentageText: {
        color: theme.palette.text.secondary,
    },
}));

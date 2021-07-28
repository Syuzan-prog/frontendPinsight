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
    sliderLabel: {
        marginBottom: '10px',
    },
    sliderContainer: {
        marginTop: '15px',
    },
    select: {
        marginTop: 8,
        width: '100%',
        '& div': {
            width: '100%',
        },
    },
    resetText: {
        marginLeft: '5px',
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
}));

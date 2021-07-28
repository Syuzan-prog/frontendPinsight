import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '680px',
        height: '730px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    popupDesc: {
        marginTop: '8px',
        maxWidth: '400px',
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    form: {
        marginTop: '53px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
    },
    content: {
        width: '400px',
    },
    settingsInput: {
        width: '100%',
        '& div': {
            width: '100%',
        },
    },
    inputMarginTop: {
        marginTop: '37px',
    },
    button: {
        height: '42px',
    },
    buttonContainer: {
        width: 'calc(100% - 60px)',
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '60px',
        paddingRight: '60px',
    },
}));

export default useStyles;

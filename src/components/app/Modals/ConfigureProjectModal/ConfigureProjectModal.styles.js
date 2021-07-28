import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    modal: {
        padding: '58px 56px 60px 56px',
    },
    container: {
        width: '828px',
        height: '572px',
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
        height: '100%',
    },
    fieldsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 24,
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
        display: 'flex',
        marginTop: 'auto',
        marginLeft: 'auto',
    },
}));

export default useStyles;

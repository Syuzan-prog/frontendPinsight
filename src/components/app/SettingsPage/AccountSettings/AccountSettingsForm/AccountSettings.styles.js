import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    form: {
        marginTop: '45px',
    },
    settingsInput: {
        width: '100%',
        '& div': {
            width: '100%',
        },
        color: theme.palette.text.primary,
    },
    changePassword: {
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontSize: '12px',
        letterSpacing: '0.4px',
        lineHeight: '20px',
        color: '#007DFF',
        marginBottom: 10,
        display: 'flex',
        justifyContent: 'flex-end',
        cursor: 'pointer',
    },
    saveButton: {
        width: '159px!important',
        height: '42px',
    },
    buttonContainer: {
        width: 'calc(100% - 60px)',
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '120px',
        paddingRight: '60px',
    },
    inputContainer: {
        display: 'inline-flex',
        width: 'calc(50% - 60px)',
    },
    passwordContainer: {
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
}));

export default useStyles;

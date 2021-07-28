import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
    },
    chooseAvatarText: {
        marginTop: '4px',
        color: theme.palette.text.secondary,
    },
    personalInfoText: {
        marginTop: '40px',
        color: theme.palette.text.primary,
    },
    editText: {
        marginTop: '4px',
        color: theme.palette.text.secondary,
    },
    form: {
        marginTop: '45px',
    },
    settingsInput: {
        width: '100%',
        '& div': {
            width: '100%',
        },
    },
    changePassword: {
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontSize: '12px',
        letterSpacing: '0.4px',
        lineHeight: '20px',
        color: '#007DFF',
        margin: '30px 0 10px 0',
        display: 'flex',
        justifyContent: 'flex-end',
        width: 'calc(50% - 60px)',
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
        marginTop: '94px',
        paddingRight: '60px',
    },
    inputContainer: {
        display: 'inline-flex',
        width: 'calc(50% - 60px)',
        marginRight: '60px!important',
    },
}));

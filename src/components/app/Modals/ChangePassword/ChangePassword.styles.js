import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    modal: {
        width: '328px',
        height: '435px',
        paddingBottom: '38px',
        paddingTop: '54px!important',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    settingsInput: {
        width: '280px',
        '& input': {
            width: '280px',
        },
        color: theme.palette.text.primary,
    },
    form: {
        width: '276px',
    },
    button: {
        marginTop: '10px',
        height: '42px',
    },
    forgot: {
        color: '#2196F3',
        display: 'block',
        textAlign: 'center',
        marginTop: '12px',
        cursor: 'pointer',
    },
}));

export default useStyles;

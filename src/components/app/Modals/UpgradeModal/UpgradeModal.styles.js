import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'relative',
        width: '450px',
        height: '316px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    closeIcon: {
        position: 'absolute',
        right: '30px',
        top: '30px',
        cursor: 'pointer',
    },
    headerText: {
        marginTop: '17px',
    },
    descText: {
        marginTop: '14px',
        width: '370px',
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    buttonContainer: {
        width: '271px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '28px',
    },
    button: {
        width: '133px',
        height: '36px',
    },
}));

export default useStyles;

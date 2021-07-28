import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    nameList: {
        display: 'flex',
        alignItems: 'center',
        width: '180px',
        flexWrap: 'wrap',
        position: 'relative',
    },
    list: {
        position: 'absolute',
        height: '304px',
        width: '186px',
        overflowY: 'scroll',
        background: '#FFFFFF',
        boxShadow: '0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px rgba(0, 0, 0, 0.14), 0 1px 18px rgba(0, 0, 0, 0.12)',
        borderRadius: '4px',
        top: '50px',
    },
    dropIcon: {
        marginLeft: '15px',
    },
    dataName: {
        marginRight: '16px',
    },
}));

import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: 'calc(100% - 48px)',
        padding: '22px 24px',
        marginTop: '24px',
        height: '100%',
    },
    table: {
        minWidth: 650,
    },
    tableBody: {
        marginTop: '24px',
        boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px rgb(0 0 0 / 14%), 0px 1px 5px rgb(0 0 0 / 12%)',
        color: 'rgba(0, 0, 0, 0.87)',
        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        backgroundColor: '#fff',
        borderRadius: 4,
    },
    tableHead: {
        background: 'linear-gradient(0deg, rgba(85, 85, 206, 0.08), rgba(85, 85, 206, 0.08)), #FFFFFF',
        boxShadow: 'inset 0px -1px 0px #E0E0E0',
    },
    dataLabel: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        lineHeight: '17px',
        color: theme.palette.text.primary,
    },
    headerCellText: {
        lineHeight: '22px',
        fontStyle: 'normal',
        color: theme.palette.text.primary,
        textTransform: 'capitalize',
    },
    cellText: {
        color: theme.palette.text.secondary,
    },
    paperHeader: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    form: {
        width: '100px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        '& > label': {
            position: 'relative',
        },
        '& > div': {
            marginTop: 0,
            '&:before': {
                display: 'none',
            },
        },
    },
}));

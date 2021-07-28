import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: 'calc(100% - 48px)',
        padding: '22px 24px',
        marginTop: '24px',
    },
    tableContainer: {
        maxHeight: 280,
        marginTop: 24,
        boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px rgb(0 0 0 / 14%), 0px 1px 5px rgb(0 0 0 / 12%)',
        color: 'rgba(0, 0, 0, 0.87)',
        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        backgroundColor: '#fff',
        borderRadius: 4,
    },
    table: {
        minWidth: 650,
    },
    tableBody: {
        overflowY: 'scroll',
    },
    tableHead: {
        background: 'linear-gradient(0deg, rgba(85, 85, 206, 0.08), rgba(85, 85, 206, 0.08)), #FFFFFF',
        boxShadow: 'inset 0px -1px 0px #E0E0E0',
    },
    caption: {
        position: 'sticky',
        bottom: 0,
        background: '#fff',
        borderTop: '1px solid rgb(224, 224, 224)',
        zIndex: 2,
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
    },
    bodyCell: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        lineHeight: '20px',
        color: theme.palette.text.secondary,
        letterSpacing: '0.15px',
    },
    chip: {
        fontSize: '13px',
        lineHeight: '18px',
        color: theme.palette.primary.contrastText,
        letterSpacing: '0.16px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '16px',
        height: '24px',
        textTransform: 'capitalize',
        padding: '0 10px',
    },
    readyChip: {
        background: theme.palette.success.light,
    },
    analyzingChip: {
        background: theme.palette.primary.light,
    },
    failedChip: {
        background: theme.palette.error.main,
    },
    optionIcon: {
        width: '20px',
        height: '20px',
        fill: theme.palette.text.hint,
    },
}));

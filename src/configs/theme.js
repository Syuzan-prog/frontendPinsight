import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    overrides: {
        MuiDrawer: {
            root: {
                position: 'absolute',
            },
        },
        MuiOutlinedInput: {
            root: {
                borderWidth: 2,
                position: 'relative',
                '& $notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
                    borderColor: '#4A90E2',
                    // Reset on touch devices, it doesn't add specificity
                    '@media (hover: none)': {
                        borderColor: 'rgba(0, 0, 0, 0.23)',
                    },
                },
                '&$focused $notchedOutline': {
                    borderColor: '#4A90E2',
                    borderWidth: 2,
                },
            },
        },
        MuiFormLabel: {
            root: {
                '&$focused': {
                    color: '#4A90E2',
                },
            },
        },
        MuiPaper: {
            elevation1: {
                boxShadow:
          '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12);',
            },
        },
        MuiFab: {
            secondary: {
                '&:hover': {
                    backgroundColor: '#FF7542',
                },
            },
        },
        MuiAvatar: {
            colorDefault: {
                color: '#6564C4',
                backgroundColor: '#C5CAE9',
            },
            root: {
                '&.small': {
                    height: 40,
                    width: 40,
                },
                '&.medium': {
                    height: 76,
                    width: 76,
                },
                '&.large': {
                    height: 80,
                    width: 80,
                },
            },
        },
        MuiMenuItem: {
            root: {
                '&:hover': {
                    background: 'rgba(0, 0, 0, 0.08)',
                },
            },
        },
        MuiStepper: {
            root: {
                width: 400,
            },
        },
        MuiStepLabel: {
            iconContainer: {
                paddingRight: '0',
            },
        },
        MuiStepIcon: {
            active: {
                color: 'rgb(33, 150, 243) !important',
            },
            completed: {
                color: 'rgb(33, 150, 243) !important',
            },
        },
        MuiTableContainer: {
            root: {
                boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px rgb(0 0 0 / 14%), 0px 1px 5px rgb(0 0 0 / 12%)',
                color: 'rgba(0, 0, 0, 0.87)',
                transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                backgroundColor: '#fff',
                borderRadius: 4,
            },
        },
        MuiTableHead: {
            root: {
                background: 'linear-gradient(0deg, rgba(85, 85, 206, 0.08), rgba(85, 85, 206, 0.08)), #FFFFFF',
                boxShadow: 'inset 0px -1px 0px #E0E0E0',
            },
        },
        MuiTableCell: {
            root: {
                padding: '0 16px',
                height: 32,
            },
            head: {
                color: 'rgba(0, 0, 0, 0.87)',
            },
            body: {
                lineHeight: '20px',
                color: 'rgba(0, 0, 0, 0.54)',
                letterSpacing: '0.15px',
            },
        },
        MuiButton: {
            containedPrimary: {
                '&$disabled': {
                    color: '#ffffff',
                    backgroundColor: 'rgba(197, 202, 233, 1)',
                },
            },
            text: {
                color: 'rgba(0, 0, 0, 0.54)',
            },
        },
    },
    palette: {
        black: '#212121',
        primary: {
            main: '#5555CE',
            dark: '#2D2D9A',
            light: '#7C7CD9',
            contrastText: '#FFFFFF',
            background:
        'linear-gradient(0deg, rgba(85, 85, 206, 0.08), rgba(85, 85, 206, 0.08)), #FFFFFF',
            border: '#C5CAE9',
        },
        secondary: {
            main: '#FF7542',
            dark: '#E63E00',
            light: '#FF9A75',
            contrastText: '#FFFFFF',
        },
        text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.54)',
            disabled: 'rgba(0, 0, 0, 0.34)',
            hint: 'rgba(0, 0, 0, 0.26)',
        },
        action: {
            main: '#E0E0E0',
            background: 'rgba(0, 0, 0, 0.08)',
            disabledBg:
        'linear-gradient(0deg, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.12)), #FFFFFF',
            disabled: 'rgba(0, 0, 0, 0.26)',
        },
        success: {
            main: '#4CAF50',
            dark: '#3B873E',
            light: '#7BC67E',
            contrastText: '#FFFFFF',
            lightSecondary: 'rgba(76, 175, 80, 0.1)',
        },
        info: {
            main: '#4CAF50',
            dark: '#3B873E',
            light: '#7BC67E',
            contrastText: '#FFFFFF',
            textDark:
        'linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), #2196F3',
            lightBg:
        'linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #2196F3',
            border: 'rgba(33, 150, 243, 0.5)',
        },
        warning: {
            main: '#FF9800',
        },
        error: {
            main: '#F44336',
            dark: '#E31B0C',
            light: '#F88078',
            contrastText: '#FFFFFF',
            textDark:
        'linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), #F44336',
            lightBg:
        'linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), #F44336',
        },
        other: {
            stroke: 'rgba(0, 0, 0, 0.23)',
        },
        grey: {
            grey50: '#FAFAFA',
        },
        focusVisible: {
            borderColor: 'red',
        },
    },
    typography: {
        h4: {
            fontSize: '34px',
            letterSpacing: '0.25px',
        },
        h5: {
            fontSize: '24px',
        },
        h6: {
            fontWeight: 500,
            fontSize: '20px',
            letterSpacing: '0.15px',
        },
        subtitle1: {
            fontSize: '16px',
            letterSpacing: '0.15px',
        },
        subtitle2: {
            fontWeight: 500,
            fontSize: '14px',
            letterSpacing: '0.1px',
        },
        body1: {
            fontSize: '16px',
            letterSpacing: '0.15px',
        },
        body2: {
            fontWeight: 400,
            fontSize: '14px',
            letterSpacing: '0.15px',
        },
        caption: {
            fontWeight: 400,
            fontSize: '12px',
            letterSpacing: '0.4px',
        },
        overline: {
            fontSize: '12px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
        },
    },
    sidebar: {
        bg: '#2D2D9A',
        bgHover: '#5555CE',
        text: {
            main: '#C5CAE9',
            active: '#FF7542',
        },
    },
});

export default theme;

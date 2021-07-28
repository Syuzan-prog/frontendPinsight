import 'resources/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from 'configs/theme';
import store from 'state';

import Root from './Root';

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <Root />
        </ThemeProvider>
    </Provider>,
    document.getElementById('root')
);

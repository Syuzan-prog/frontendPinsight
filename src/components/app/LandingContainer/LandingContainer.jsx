import React from 'react';
import {
    Switch, Route,
} from 'react-router-dom';

import LogIn from 'components/app/LogIn';
import SignUp from 'components/app/SignUp';
import SignUpSuccess from 'components/app/SignUpSuccess';
import RecoverPassword from 'components/app/RecoverPassword';
import CreateNewPassword from 'components/app/CreateNewPassword';
import CheckYourEmail from 'components/app/CheckYourEmail/CheckYourEmail';
import { routes } from 'configs/app.routes';

import styles from './LandingContainer.scss';

const LandingContainer = () => (
    <div className={styles.container}>
        <Switch>
            <Route exact path={routes.login} component={LogIn} />
            <Route exact path={routes.signup} component={SignUp} />
            <Route exact path={routes.signupSuccess} component={SignUpSuccess} />
            <Route exact path={routes.forgotPassword} component={RecoverPassword} />
            <Route exact path={routes.passwordResetSuccess} component={CheckYourEmail} />
            <Route exact path={routes.createPassword} component={CreateNewPassword} />
        </Switch>
    </div>
);

export default LandingContainer;

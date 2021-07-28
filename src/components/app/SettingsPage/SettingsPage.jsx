import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import PaymentIcon from '@material-ui/icons/Payment';

import Avatar from 'components/common/Avatar';
import { routes } from 'configs/app.routes';

import AccountSettings from './AccountSettings';
import PlansAndBillings from './PlansAndBilling';

import styles from './SettingsPage.scss';

const navigationOptions = [
    { route: routes._app._settings.account, label: 'Account Settings', Icon: PersonIcon },
    { route: routes._app._settings.plansAndBilling, label: 'Plans & Billing', Icon: PaymentIcon },
];

const SettingsPage = ({ fullName, avatarUrl, email, position }) => (
    <div className={styles.container}>
        <Paper className={styles.navigation}>
            <Avatar size="large" src={avatarUrl} wrapperClassName={styles.avatar} />
            <Typography variant="subtitle1">{fullName}</Typography>
            <Typography variant="body2" color="textSecondary">{email}</Typography>
            <Typography variant="body2" className={styles.position}>{position}</Typography>
            <div className={styles.menu}>
                {navigationOptions.map(({ route, label, Icon }) => (
                    <NavLink key={label} to={route} className={styles.navLink}>
                        <Icon />
                        <Typography variant="subtitle2" color="textSecondary">{label}</Typography>
                    </NavLink>
                ))}
            </div>
        </Paper>
        <Paper className={styles.content}>
            <Switch>
                <Route path={routes._app._settings.account} component={AccountSettings} />
                <Route path={routes._app._settings.plansAndBilling} component={PlansAndBillings} />
                <Redirect to={routes._app._settings.account} />
            </Switch>
        </Paper>
    </div>
);

SettingsPage.propTypes = {
    fullName: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string,
    email: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
};

export default SettingsPage;

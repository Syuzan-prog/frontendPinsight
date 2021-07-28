import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { Field } from 'redux-form';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';

import { routes } from 'configs/app.routes';
import TextInput from 'components/common/TextInput';
import PasswordInput from 'components/common/PasswordInput';
import Checkbox from 'components/common/Checkbox';
import Button from 'components/common/Button';

import {
    LOGIN_EMAIL_FIELD_NAME,
    LOGIN_PASSWORD_FIELD_NAME,
    LOGIN_REMEMBER_ME_FIELD_NAME,
} from 'constants/landing.constants';

import styles from './LogIn.scss';

const LogIn = ({ handleSubmit, submitting, error }) => (
    <Paper className={styles.block}>
        <Grid align="center">
            <Typography variant="h6">Sign In</Typography>
            <Typography variant="body2" color="textSecondary" className={clsx(styles.text, { [styles.pristine]: !error })}>
                Don&apos;t have an account?
                <Link to={routes.signup} className={styles.link}>
                    Create
                </Link>
            </Typography>
        </Grid>
        {!!error && (
            <Alert severity="error" icon={false} className={styles.alert}>
                <Typography variant="caption">The entered email or password is incorrect.</Typography>
            </Alert>
        )}
            <Alert severity="warning" icon={false} className={styles.alertWarning}>
                <Typography variant="caption">
                    Your account is being prepared. You will get a confirmation email when you are all set and then you can start your journey!
                </Typography>
            </Alert>
        <form onSubmit={handleSubmit}>
            <Field component={TextInput} id="email" name={LOGIN_EMAIL_FIELD_NAME} label="Email" fullWidth isRequired />
            <Typography variant="caption" className={styles.forgotPasswordLink}>
                <Link to={routes.forgotPassword}>Forgot Password?</Link>
            </Typography>
            <Field
                component={PasswordInput}
                name={LOGIN_PASSWORD_FIELD_NAME}
                label="Password"
                inputProps={{
                    autoComplete: 'password',
                }}
                fullWidth
                isRequired
            />
            <Field
                component={Checkbox}
                controlClassName={styles.checkbox}
                className={styles.coloredCheckbox}
                name={LOGIN_REMEMBER_ME_FIELD_NAME}
                label="Remember me"
            />
            <Button
                type="submit"
                color="primary"
                variant="contained"
                className={styles.button}
                disabled={submitting}
                fullWidth
            >
                Sign In
            </Button>
        </form>
    </Paper>
);

LogIn.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    error: PropTypes.bool,
};

export default LogIn;

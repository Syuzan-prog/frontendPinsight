import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Field } from 'redux-form';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Button from 'components/common/Button';
import PasswordInput from 'components/common/PasswordInput';
import TextInput from 'components/common/TextInput';
import { routes } from 'configs/app.routes';
import {
    SIGNUP_FULL_NAME_FIELD_NAME,
    SIGNUP_COMPANY_FIELD_NAME,
    SIGNUP_POSITION_FIELD_NAME,
    SIGNUP_EMAIL_FIELD_NAME,
    SIGNUP_PASSWORD_FIELD_NAME,
    SIGNUP_CONFIRM_PASSWORD_FIELD_NAME,
} from 'constants/landing.constants';

import styles from './SignUp.scss';

const SignUp = ({ handleSubmit }) => (
    <Paper className={styles.block}>
        <Grid align="center">
            <Typography variant="h6">Sign Up</Typography>
            <Typography variant="body2" color="textSecondary" className={styles.text}>
                Already have an account?
                <Link
                    to={routes.login}
                    variant="subtitle2"
                    className={styles.link}
                >
                    Login
                </Link>
            </Typography>
        </Grid>
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Field
                        component={TextInput}
                        name={SIGNUP_FULL_NAME_FIELD_NAME}
                        label="Full Name"
                        fullWidth
                        isRequired
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Field
                        component={TextInput}
                        name={SIGNUP_POSITION_FIELD_NAME}
                        label="Position"
                        fullWidth
                        isRequired
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Field
                        component={TextInput}
                        name={SIGNUP_COMPANY_FIELD_NAME}
                        label="Company"
                        fullWidth
                        isRequired
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Field
                        component={TextInput}
                        name={SIGNUP_EMAIL_FIELD_NAME}
                        label="Email Address"
                        fullWidth
                        isRequired
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Field
                        component={PasswordInput}
                        name={SIGNUP_PASSWORD_FIELD_NAME}
                        label="Password"
                        helperText="* Must contain at least 8 characters, a number, an uppercase and a lowercase."
                        inputProps={{
                            autoComplete: 'new-password',
                        }}
                        fullWidth
                        isRequired
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Field
                        component={PasswordInput}
                        name={SIGNUP_CONFIRM_PASSWORD_FIELD_NAME}
                        label="Confirm Password"
                        fullWidth
                        isRequired
                    />
                </Grid>
            </Grid>
            <Grid align="center" className={styles.marginTop}>
                <Button
                    type="submit"
                    className={styles.button}
                    color="primary"
                    variant="contained"
                >
                    sign up
                </Button>
                <Typography variant="caption" color="textSecondary" className={styles.textIncorrect}>
                    By signing up, I agree to Pinsight&apos;s
                </Typography>
                <Typography variant="caption">
                    <Link
                        to={routes.termsConditions}
                        className={styles.termsConditions}
                    >
                        Terms and Conditions.
                    </Link>
                </Typography>
            </Grid>
        </form>
    </Paper>
);

SignUp.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
};

export default SignUp;

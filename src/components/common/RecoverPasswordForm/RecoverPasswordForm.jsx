import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { useSelector } from 'react-redux';

import Typography from '@material-ui/core/Typography';

import TextInput from 'components/common/TextInput';
import { RECOVER_PASSWORD_EMAIL_FIELD_NAME } from 'constants/landing.constants';
import Button from 'components/common/Button';

import { Link } from 'react-router-dom';
import { routes } from 'configs/app.routes';
import { getIsLoggedIn } from 'state/selectors/account.selectors';
import styles from './RecoverPasswordForm.scss';

const RecoverPasswordForm = ({ handleSubmit }) => {
    const isLoggedIn = useSelector(getIsLoggedIn);
    return (
        <>
            <Typography variant="h6">Recover Password</Typography>
            <Typography
                variant="body2"
                color="textSecondary"
                className={clsx(styles.text, {
                [styles.inAppText]: isLoggedIn,
            })}
            >
                We will send you a link to reset the password.
            </Typography>
            <form onSubmit={handleSubmit} className={styles.form}>
                <Field
                    component={TextInput}
                    name={RECOVER_PASSWORD_EMAIL_FIELD_NAME}
                    className={clsx(styles.formControl, {
                        [styles.inAppInput]: isLoggedIn,
                    })}
                    label="Email Address"
                    isRequired
                />
                <Button
                    type="submit"
                    className={clsx(styles.button, {
                        [styles.inAppButton]: isLoggedIn,
                    })}
                    color="primary"
                    variant="contained"
                    fullWidth
                >
                    RECOVER PASSWORD
                </Button>
                {
                    !isLoggedIn && (
                        <Typography variant="caption">
                            <Link to={routes.login} className={styles.link}>
                                Back to Login
                            </Link>
                        </Typography>
                    )
                }
            </form>
        </>
    );
};

RecoverPasswordForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
};

export default RecoverPasswordForm;

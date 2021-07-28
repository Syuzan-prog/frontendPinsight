import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { parse } from 'query-string';

import { change, Field } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Button from 'components/common/Button';
import PasswordInput from 'components/common/PasswordInput';
import {
    CREATE_NEW_PASSWORD_CONFIRM_PASSWORD_FIELD_NAME,
    CREATE_NEW_PASSWORD_PASSWORD_FIELD_NAME, CREATE_NEW_PASSWORD_TOKEN_FIELD_NAME,
} from 'constants/landing.constants';
import styles from './CreatePasswordForm.scss';

const CreatePasswordForm = ({ handleSubmit, form }) => {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        const { resetToken } = parse(location.search);

        if (resetToken) {
            dispatch(change(form, CREATE_NEW_PASSWORD_TOKEN_FIELD_NAME, resetToken));
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <Grid align="center">
                <Typography variant="h6" className={styles.title}>
                    Create New Password
                </Typography>
            </Grid>
            <form onSubmit={handleSubmit} className={styles.form}>
                <Field
                    component={PasswordInput}
                    name={CREATE_NEW_PASSWORD_PASSWORD_FIELD_NAME}
                    label="Password"
                    helperText="* Must contain at least 8 characters, a number, an uppercase and a lowercase."
                    className={styles.passwordField}
                    fullWidth
                    isRequired
                />
                <Field
                    component={PasswordInput}
                    name={CREATE_NEW_PASSWORD_CONFIRM_PASSWORD_FIELD_NAME}
                    label="Confirm Password"
                    fullWidth
                    isRequired
                />
                <Button
                    type="submit"
                    className={styles.button}
                    color="primary"
                    variant="contained"
                    fullWidth
                >
                    reset password
                </Button>
            </form>
        </>
    );
};

CreatePasswordForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    form: PropTypes.string.isRequired,
};

export default CreatePasswordForm;

import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import Typography from '@material-ui/core/Typography';

import { RECOVER_PASSWORD_MODAL_NAME } from 'constants/modal.constants';
import Button from 'components/common/Button';
import PasswordInput from 'components/common/PasswordInput';
import {
    CHANGE_CURRENT_PASSWORD_FIELD_NAME, CHANGE_PASSWORD_FIELD_NAME, CHANGE_CONFIRM_PASSWORD_FIELD_NAME,
} from 'constants/settings.constants';
import Modal from '../Modal';
import { withModalControls } from '../ModalContext';

import useStyles from './ChangePassword.styles';

const ChangePassword = ({ onClose, handleSubmit, openModal }) => {
    const classes = useStyles();
    const handleOpenRecoverPasswordModal = () => {
        openModal(RECOVER_PASSWORD_MODAL_NAME);
    };
    return (
        <Modal onClose={onClose} className={classes.modal}>
            <div className={classes.container}>
                <Typography variant="h6">Change Password</Typography>
                <form onSubmit={handleSubmit} className={clsx('m-t-30', classes.form)}>
                    <Field
                        component={PasswordInput}
                        className={classes.settingsInput}
                        name={CHANGE_CURRENT_PASSWORD_FIELD_NAME}
                        label="Current Password"
                        isRequired
                        disableShowIcon
                    />
                    <Field
                        component={PasswordInput}
                        name={CHANGE_PASSWORD_FIELD_NAME}
                        className={clsx(classes.settingsInput, 'm-t-11')}
                        label="New Password"
                        helperText="* Must contain at least 8 characters, a number, an uppercase and a lowercase."
                        isRequired
                    />
                    <Field
                        component={PasswordInput}
                        name={CHANGE_CONFIRM_PASSWORD_FIELD_NAME}
                        className={clsx(classes.settingsInput, 'm-t-30')}
                        label="Confirm Password"
                        isRequired
                    />
                    <Button
                        type="submit"
                        className={classes.button}
                        color="primary"
                        variant="contained"
                        fullWidth
                    >
                        CHANGE PASSWORD
                    </Button>
                    <Typography onClick={handleOpenRecoverPasswordModal} variant="caption" className={classes.forgot}>
                        Forgot Password?
                    </Typography>
                </form>
            </div>
        </Modal>
    );
};

ChangePassword.propTypes = {
    onClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
};

export default withModalControls(ChangePassword);

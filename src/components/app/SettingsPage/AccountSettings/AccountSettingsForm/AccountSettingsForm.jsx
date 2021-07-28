import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Field } from 'redux-form';
import Grid from '@material-ui/core/Grid';

import {
    CHANGE_FULL_NAME_FIELD_NAME,
    CHANGE_POSITION_FIELD_NAME,
    CHANGE_EMAIL_FIELD_NAME,
    CHANGE_COMPANY_FIELD_NAME,
} from 'constants/settings.constants';
import { CHANGE_PASSWORD_MODAL_NAME } from 'constants/modal.constants';
import TextInput from 'components/common/TextInput';
import { withModalControls } from 'components/app/Modals';
import Button from 'components/common/Button';

import useStyles from './AccountSettings.styles';

const AvatarSettingsForm = ({ openModal, isSubmitDisabled }) => {
    const classes = useStyles();
    const openChangePasswordModal = () => {
        openModal(CHANGE_PASSWORD_MODAL_NAME);
    };

    return (
        <Grid className={classes.form}>
            <Grid item md={6} className={classes.inputContainer}>
                <Field
                    component={TextInput}
                    name={CHANGE_FULL_NAME_FIELD_NAME}
                    label="Full Name"
                    className={classes.settingsInput}
                />
            </Grid>
            <Grid item md={6} className={clsx(classes.inputContainer, 'm-l-60')}>
                <Field
                    component={TextInput}
                    name={CHANGE_POSITION_FIELD_NAME}
                    label="Position"
                    className={classes.settingsInput}
                />
            </Grid>
            <Grid item md={6} className={clsx(classes.inputContainer, 'm-t-30')}>
                <Field
                    component={TextInput}
                    name={CHANGE_COMPANY_FIELD_NAME}
                    label="Company"
                    className={classes.settingsInput}
                />
            </Grid>
            <Grid item md={6} className={clsx(classes.inputContainer, 'm-l-60')}>
                <Field
                    component={TextInput}
                    name={CHANGE_EMAIL_FIELD_NAME}
                    label="Email"
                    className={clsx(classes.settingsInput, 'm-t-30')}
                    disabled
                />
            </Grid>
            <Grid item md={6} className={clsx(classes.inputContainer, classes.passwordContainer)}>
                <span onClick={openChangePasswordModal} className={classes.changePassword}>Change Password</span>
                <TextInput
                    label="Password"
                    value="********"
                    className={classes.settingsInput}
                    disabled
                />
            </Grid>
            <div className={classes.buttonContainer}>
                <Button
                    type="submit"
                    className={classes.saveButton}
                    color="primary"
                    variant="contained"
                    fullWidth
                    disabled={isSubmitDisabled}
                >
                    Save Changes
                </Button>
            </div>
        </Grid>
    );
};

AvatarSettingsForm.propTypes = {
    openModal: PropTypes.func.isRequired,
    isSubmitDisabled: PropTypes.bool.isRequired,
};

export default withModalControls(AvatarSettingsForm);

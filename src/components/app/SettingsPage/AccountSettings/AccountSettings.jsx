import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import Typography from '@material-ui/core/Typography';
import { CHANGE_IMAGE_FIELD_NAME } from 'constants/settings.constants';

import { useStyles } from './AccountSettings.styles';
import AvatarList from './AvatarList/AvatarList';
import AccountSettingsForm from './AccountSettingsForm';

const AccountSettings = ({ handleSubmit, submitting, invalid }) => {
    const classes = useStyles();
    const isSubmitDisabled = useMemo(() => submitting || invalid, [submitting, invalid]);

    return (
        <form className={classes.container} onSubmit={handleSubmit}>
            <Typography variant="subtitle1">Avatar</Typography>
            <Typography variant="body2" className={classes.chooseAvatarText}>
                Choose one of the avatars or upload yours.
            </Typography>
            <Field
                component={AvatarList}
                name={CHANGE_IMAGE_FIELD_NAME}
            />
            <Typography variant="subtitle1" className={classes.personalInfoText}>Personal Information</Typography>
            <Typography variant="body2" className={classes.editText}>Edit your personal information.</Typography>
            <AccountSettingsForm isSubmitDisabled={isSubmitDisabled} />
        </form>
    );
};

AccountSettings.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
};

export default AccountSettings;

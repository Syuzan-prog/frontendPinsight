import { reduxForm } from 'redux-form';

import { CREATE_NEW_PASSWORD_FORM_NAME } from 'constants/landing.constants';
import { resetPassword, resetPasswordSuccess, resetPasswordFail } from 'state/modules/resetPassword.module';
import { onSubmitActions } from 'state/modules/formSubmit.module';
import validate from 'core/validators/createNewPassword';

import CreatePasswordForm from './CreatePasswordForm';

const form = {
    form: CREATE_NEW_PASSWORD_FORM_NAME,
    onSubmit: onSubmitActions(resetPassword, resetPasswordSuccess, resetPasswordFail),
    validate,
};

export default reduxForm(form)(CreatePasswordForm);

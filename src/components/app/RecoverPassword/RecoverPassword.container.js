import { reduxForm } from 'redux-form';

import { RECOVER_PASSWORD_FORM_NAME } from 'constants/landing.constants';
import { sendResetLink, sendResetLinkSuccess, sendResetLinkFail } from 'state/modules/recoverPassword.module';
import { onSubmitActions } from 'state/modules/formSubmit.module';
import validate from 'core/validators/recoverPassword';

import RecoverPassword from './RecoverPassword';

const form = {
    form: RECOVER_PASSWORD_FORM_NAME,
    onSubmit: onSubmitActions(sendResetLink, sendResetLinkSuccess, sendResetLinkFail),
    validate,
};

export default reduxForm(form)(RecoverPassword);

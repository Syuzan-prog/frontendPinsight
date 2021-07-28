import { reduxForm } from 'redux-form';

import { CHANGE_PASSWORD_FORM } from 'constants/settings.constants';
import { changePassword, changePasswordSuccess, changePasswordFail } from 'state/modules/changePassword.module';
import { onSubmitActions } from 'state/modules/formSubmit.module';
import validate from 'core/validators/changePassword';

import ChangePassword from './ChangePassword';

const form = {
    form: CHANGE_PASSWORD_FORM,
    onSubmit: onSubmitActions(changePassword, changePasswordSuccess, changePasswordFail),
    validate,
};

export default reduxForm(form)(ChangePassword);

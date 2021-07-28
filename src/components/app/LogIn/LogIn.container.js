import { reduxForm } from 'redux-form';

import { LOGIN_FORM_NAME } from 'constants/landing.constants';
import { login, loginSuccess, loginFail } from 'state/modules/login.module';
import { onSubmitActions } from 'state/modules/formSubmit.module';
import validate from 'core/validators/login';

import LogIn from './LogIn';

const form = {
    form: LOGIN_FORM_NAME,
    onSubmit: onSubmitActions(login, loginSuccess, loginFail),
    validate,
};

export default reduxForm(form)(LogIn);

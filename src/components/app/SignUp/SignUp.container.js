import { reduxForm } from 'redux-form';

import { SIGNUP_FORM_NAME } from 'constants/landing.constants';
import { signup, signupSuccess, signupFail } from 'state/modules/signup.module';
import { onSubmitActions } from 'state/modules/formSubmit.module';
import validate from 'core/validators/signup';

import SignUp from './SignUp';

const form = {
    form: SIGNUP_FORM_NAME,
    onSubmit: onSubmitActions(signup, signupSuccess, signupFail),
    validate,
};

export default reduxForm(form)(SignUp);

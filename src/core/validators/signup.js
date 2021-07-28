import {
    SIGNUP_FULL_NAME_FIELD_NAME,
    SIGNUP_COMPANY_FIELD_NAME,
    SIGNUP_POSITION_FIELD_NAME,
    SIGNUP_EMAIL_FIELD_NAME,
    SIGNUP_PASSWORD_FIELD_NAME,
    SIGNUP_CONFIRM_PASSWORD_FIELD_NAME,
} from 'constants/landing.constants';

import validatePassword from './password';

function validate(values) {
    const errors = {};

    if (!values[SIGNUP_EMAIL_FIELD_NAME]) {
        errors[SIGNUP_EMAIL_FIELD_NAME] = 'Email is required';
    }

    if (!values[SIGNUP_PASSWORD_FIELD_NAME]) {
        errors[SIGNUP_PASSWORD_FIELD_NAME] = 'Password is required';
    } else if (!validatePassword(values[SIGNUP_PASSWORD_FIELD_NAME])) {
        errors[SIGNUP_PASSWORD_FIELD_NAME] = '* Must contain at least 8 characters, a number, an uppercase and a lowercase.';
    }

    if (values[SIGNUP_PASSWORD_FIELD_NAME] !== values[SIGNUP_CONFIRM_PASSWORD_FIELD_NAME]) {
        errors[SIGNUP_CONFIRM_PASSWORD_FIELD_NAME] = 'Passwords should match';
    }

    if (!values[SIGNUP_FULL_NAME_FIELD_NAME]) {
        errors[SIGNUP_FULL_NAME_FIELD_NAME] = 'Full name is required';
    }

    if (!values[SIGNUP_COMPANY_FIELD_NAME]) {
        errors[SIGNUP_COMPANY_FIELD_NAME] = 'Company is required';
    }

    if (!values[SIGNUP_POSITION_FIELD_NAME]) {
        errors[SIGNUP_POSITION_FIELD_NAME] = 'Position is required';
    }

    return errors;
}

export default validate;

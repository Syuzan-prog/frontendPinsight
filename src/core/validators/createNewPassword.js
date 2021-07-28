import {
    CREATE_NEW_PASSWORD_PASSWORD_FIELD_NAME,
    CREATE_NEW_PASSWORD_CONFIRM_PASSWORD_FIELD_NAME,
} from 'constants/landing.constants';

import validatePassword from './password';

function validate(values) {
    const errors = {};

    if (!values[CREATE_NEW_PASSWORD_PASSWORD_FIELD_NAME]) {
        errors[CREATE_NEW_PASSWORD_PASSWORD_FIELD_NAME] = 'Password is required';
    } else if (!validatePassword(values[CREATE_NEW_PASSWORD_PASSWORD_FIELD_NAME])) {
        errors[CREATE_NEW_PASSWORD_PASSWORD_FIELD_NAME] = '* Must contain at least 8 characters, a number, an uppercase and a lowercase.';
    }

    if (values[CREATE_NEW_PASSWORD_PASSWORD_FIELD_NAME] !== values[CREATE_NEW_PASSWORD_CONFIRM_PASSWORD_FIELD_NAME]) {
        errors[CREATE_NEW_PASSWORD_CONFIRM_PASSWORD_FIELD_NAME] = 'Passwords should match';
    }

    return errors;
}

export default validate;

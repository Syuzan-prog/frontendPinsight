import {
    CHANGE_CURRENT_PASSWORD_FIELD_NAME,
    CHANGE_PASSWORD_FIELD_NAME,
    CHANGE_CONFIRM_PASSWORD_FIELD_NAME,
} from 'constants/settings.constants';

import validatePassword from './password';

function validate(values) {
    const errors = {};

    if (!values[CHANGE_CURRENT_PASSWORD_FIELD_NAME]) {
        errors[CHANGE_CURRENT_PASSWORD_FIELD_NAME] = 'Current password is required';
    } else if (!validatePassword(values[CHANGE_CURRENT_PASSWORD_FIELD_NAME])) {
        errors[CHANGE_CURRENT_PASSWORD_FIELD_NAME] = '* Must contain at least 8 characters, a number, an uppercase and a lowercase.';
    }

    if (values[CHANGE_PASSWORD_FIELD_NAME] !== values[CHANGE_CONFIRM_PASSWORD_FIELD_NAME]) {
        errors[CHANGE_CONFIRM_PASSWORD_FIELD_NAME] = 'Passwords should match';
    } else if (!validatePassword(values[CHANGE_PASSWORD_FIELD_NAME])) {
        errors[CHANGE_PASSWORD_FIELD_NAME] = '* Must contain at least 8 characters, a number, an uppercase and a lowercase.';
        errors[CHANGE_CONFIRM_PASSWORD_FIELD_NAME] = '* Must contain at least 8 characters, a number, an uppercase and a lowercase.';
    }

    return errors;
}

export default validate;

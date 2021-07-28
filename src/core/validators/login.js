import {
    LOGIN_EMAIL_FIELD_NAME,
    LOGIN_PASSWORD_FIELD_NAME,
} from 'constants/landing.constants';

function validate(values) {
    const errors = {};

    if (!values[LOGIN_EMAIL_FIELD_NAME]) {
        errors[LOGIN_EMAIL_FIELD_NAME] = 'Email is required';
    }

    if (!values[LOGIN_PASSWORD_FIELD_NAME]) {
        errors[LOGIN_PASSWORD_FIELD_NAME] = 'Password is required';
    }

    return errors;
}

export default validate;

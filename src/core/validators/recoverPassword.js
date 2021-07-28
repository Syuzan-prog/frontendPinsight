import {
    RECOVER_PASSWORD_EMAIL_FIELD_NAME,
} from 'constants/landing.constants';

function validate(values) {
    const errors = {};

    if (!values[RECOVER_PASSWORD_EMAIL_FIELD_NAME]) {
        errors[RECOVER_PASSWORD_EMAIL_FIELD_NAME] = 'Email is required';
    }

    return errors;
}

export default validate;

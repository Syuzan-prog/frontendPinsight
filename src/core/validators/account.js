import {
    CHANGE_EMAIL_FIELD_NAME,
} from 'constants/settings.constants';
import validateEmail from './email';

function validate(values) {
    const errors = {};

    if (values[CHANGE_EMAIL_FIELD_NAME]) {
        if (!validateEmail(values[CHANGE_EMAIL_FIELD_NAME])) {
            errors[CHANGE_EMAIL_FIELD_NAME] = 'Please provide a valid email';
        }
    }

    return errors;
}

export default validate;

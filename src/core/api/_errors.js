export const GENERIC_VALIDATION_ERROR_FIELD_NAME = '_form';

/* eslint-disable no-param-reassign */
// Error format { fieldName: ['error1', 'error2', ...] }
const formatValidationErrors = (errors) => {
    if (errors[GENERIC_VALIDATION_ERROR_FIELD_NAME]) {
        errors._error = errors[GENERIC_VALIDATION_ERROR_FIELD_NAME];
        delete errors[GENERIC_VALIDATION_ERROR_FIELD_NAME];
    }

    Object.keys(errors).forEach((field) => {
        errors[field] = Array.isArray(errors[field]) ? errors[field].join('\n') : errors[field];
    });

    return errors;
};
/* eslint-enable no-param-reassign */

export default formatValidationErrors;

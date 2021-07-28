import {
    PROJECT_PROJECT_NAME_FIELD_NAME,
    PROJECT_DATA_FIELD_NAME,
    PROJECT_TARGET_VARIABLE_FIELD_NAME,
    PROJECT_ID_VARIABLE_FIELD_NAME,
} from 'constants/project.constants';

function validate(values) {
    const errors = {};

    if (!values[PROJECT_PROJECT_NAME_FIELD_NAME]) {
        errors[PROJECT_PROJECT_NAME_FIELD_NAME] = 'Name is required';
    }

    if (!values[PROJECT_DATA_FIELD_NAME]) {
        errors[PROJECT_DATA_FIELD_NAME] = 'Data is required';
    }

    if (!values[PROJECT_TARGET_VARIABLE_FIELD_NAME]) {
        errors[PROJECT_TARGET_VARIABLE_FIELD_NAME] = 'Target variable is required';
    }

    if (!values[PROJECT_ID_VARIABLE_FIELD_NAME]) {
        errors[PROJECT_ID_VARIABLE_FIELD_NAME] = 'ID variable is required';
    }

    return errors;
}

export default validate;

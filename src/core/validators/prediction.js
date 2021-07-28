import {
    PREDICTION_NAME_FIELD_NAME,
    PREDICTION_DESCRIPTION_FIELD_NAME,
    PREDICTION_DATA_FIELD_NAME,
    PREDICTION_PROJECT_FIELD_NAME,
    MAX_DESCRIPTION_STRING_LENGTH,
} from 'constants/prediction.constants';

function validate(values) {
    const errors = {};

    if (!values[PREDICTION_NAME_FIELD_NAME]) {
        errors[PREDICTION_NAME_FIELD_NAME] = 'Name is required';
    }

    if (!values[PREDICTION_DATA_FIELD_NAME]) {
        errors[PREDICTION_DATA_FIELD_NAME] = 'Data is required';
    }

    if (!values[PREDICTION_PROJECT_FIELD_NAME]) {
        errors[PREDICTION_PROJECT_FIELD_NAME] = 'Project is required';
    }

    if (
        values[PREDICTION_DESCRIPTION_FIELD_NAME]
        && values[PREDICTION_DESCRIPTION_FIELD_NAME].length > MAX_DESCRIPTION_STRING_LENGTH
    ) {
        errors[PREDICTION_DESCRIPTION_FIELD_NAME] = `Max ${MAX_DESCRIPTION_STRING_LENGTH} characters allowed`;
    }

    return errors;
}

export default validate;

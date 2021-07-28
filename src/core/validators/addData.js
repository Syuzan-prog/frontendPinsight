import {
    CSV_NAME_FIELD_NAME,
    CSV_FILES_FIELD_NAME,
    CSV_DESCRIPTION_FIELD_NAME,
} from 'constants/addData.constants';

export function validateCSV(values) {
    const errors = {};

    if (!values[CSV_FILES_FIELD_NAME]?.length) {
        errors[CSV_FILES_FIELD_NAME] = true;
    }

    if (!values[CSV_NAME_FIELD_NAME]) {
        errors[CSV_NAME_FIELD_NAME] = 'Name is required';
    }

    if (values[CSV_DESCRIPTION_FIELD_NAME] && values[CSV_DESCRIPTION_FIELD_NAME].length > 105) {
        errors[CSV_DESCRIPTION_FIELD_NAME] = 'Description should not be longer than 105 characters';
    }

    return errors;
}

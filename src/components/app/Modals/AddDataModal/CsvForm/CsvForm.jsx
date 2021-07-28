import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import Dropzone from 'components/common/Dropzone';
import TextInput from 'components/common/TextInput';
import Button from 'components/common/Button';
import {
    CSV_FILES_FIELD_NAME,
    CSV_NAME_FIELD_NAME,
    CSV_DESCRIPTION_FIELD_NAME,
} from 'constants/addData.constants';

import styles from './CsvForm.scss';

const CsvForm = ({ handleSubmit, change, uploadProgress, submitting, invalid }) => {
    const handleFilesChange = useCallback((event, newFiles) => {
        if (newFiles.length) {
            change(CSV_NAME_FIELD_NAME, newFiles[0].name);
        }
    }, [change]);

    return (
        <form onSubmit={handleSubmit}>
            <Field
                name={CSV_FILES_FIELD_NAME}
                component={Dropzone}
                maxFiles={3}
                acceptFiles=".csv"
                uploadProgress={uploadProgress}
                onChange={handleFilesChange}
            />
            <div className={styles.metaFields}>
                <Field
                    name={CSV_NAME_FIELD_NAME}
                    component={TextInput}
                    label="Name"
                    isRequired
                    helperText="Name your data to easily identify it."
                    InputProps={{ className: styles.input }}
                />
                <Field
                    name={CSV_DESCRIPTION_FIELD_NAME}
                    component={TextInput}
                    label="Description (Optional)"
                    helperText="Provide a short description of your data."
                    InputProps={{ className: styles.input }}
                />
            </div>
            <Button color="primary" className={styles.submitButton} type="submit" disabled={submitting || invalid}>add data</Button>
        </form>
    );
};

CsvForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    uploadProgress: PropTypes.number,
    submitting: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
};

export default CsvForm;

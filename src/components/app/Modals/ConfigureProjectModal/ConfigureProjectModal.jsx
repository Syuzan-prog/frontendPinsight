import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import Typography from '@material-ui/core/Typography';

import TextInput from 'components/common/TextInput';
import Button from 'components/common/Button';
import Select from 'components/common/Select';
import {
    PROJECT_PROJECT_NAME_FIELD_NAME,
    PROJECT_DESCRIPTION_FIELD_NAME,
    PROJECT_PREDICTION_TYPE_FIELD_NAME,
    PROJECT_DATA_FIELD_NAME,
    PROJECT_ID_VARIABLE_FIELD_NAME,
    PROJECT_TARGET_VARIABLE_FIELD_NAME,
    PREDICTION_TYPE_TO_LABEL,
} from 'constants/project.constants';
import { fetchReadyDatasources, fetchDatasourceVariables } from 'core/dataFetchers/datasources';

import Modal from '../Modal';
import useStyles from './ConfigureProjectModal.styles';

const ConfigureProjectModal = ({
    onClose, handleSubmit, defaultOptions, datasourceId,
    invalid, submitting, projectType,
}) => {
    const classes = useStyles();

    return (
        <Modal onClose={onClose} className={classes.modal}>
            <div className={classes.container}>
                <Typography variant="h5">Configure Project</Typography>
                <Typography variant="body2" className={classes.popupDesc}>Edit project information.</Typography>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <div className={classes.fieldsContainer}>
                        <div className={classes.content}>
                            <Field
                                component={TextInput}
                                name={PROJECT_PROJECT_NAME_FIELD_NAME}
                                type="text"
                                label="Project Name"
                                className={classes.settingsInput}
                                helperText="Name your project to easily identify it."
                                isRequired
                            />
                            <Field
                                component={TextInput}
                                name={PROJECT_PREDICTION_TYPE_FIELD_NAME}
                                type="text"
                                label="Project Type"
                                className={clsx(classes.settingsInput, classes.inputMarginTop)}
                                helperText="Type is selected when creating the project and cannot be edited."
                                format={(value) => PREDICTION_TYPE_TO_LABEL[value]}
                                isRequired
                                disabled
                            />
                            <Field
                                key={datasourceId}
                                component={Select}
                                name={PROJECT_TARGET_VARIABLE_FIELD_NAME}
                                placeholder="Select"
                                label="Target Variable"
                                className={clsx(classes.settingsInput, classes.inputMarginTop)}
                                helperText="Select the variable that you want to predict."
                                defaultOptions={defaultOptions[PROJECT_TARGET_VARIABLE_FIELD_NAME]}
                                getOptions={fetchDatasourceVariables(datasourceId, projectType)}
                                isRequired
                            />
                        </div>
                        <div className={classes.content}>
                            <Field
                                component={TextInput}
                                name={PROJECT_DESCRIPTION_FIELD_NAME}
                                type="text"
                                label="Project Description (Optional)"
                                className={classes.settingsInput}
                                helperText="Provide a short description of your project."
                            />
                            <Field
                                component={Select}
                                name={PROJECT_DATA_FIELD_NAME}
                                label="Data"
                                className={clsx(classes.settingsInput, classes.inputMarginTop)}
                                helperText="Select the data on which you want to train your model."
                                defaultOptions={defaultOptions[PROJECT_DATA_FIELD_NAME]}
                                getOptions={fetchReadyDatasources}
                                isRequired
                            />
                            <Field
                                key={datasourceId}
                                component={Select}
                                name={PROJECT_ID_VARIABLE_FIELD_NAME}
                                placeholder="Select"
                                label="ID Variable"
                                className={clsx(classes.settingsInput, classes.inputMarginTop)}
                                helperText="Select the variable that uniquely identifies each entity."
                                defaultOptions={defaultOptions[PROJECT_ID_VARIABLE_FIELD_NAME]}
                                getOptions={fetchDatasourceVariables(datasourceId, 'ID')}
                                isRequired
                            />
                        </div>
                    </div>
                    <div className={classes.buttonContainer}>
                        <Button
                            type="submit"
                            className={classes.button}
                            color="primary"
                            variant="contained"
                            disabled={invalid || submitting}
                        >
                            save changes
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

ConfigureProjectModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    defaultOptions: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    datasourceId: PropTypes.string,
    invalid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    projectType: PropTypes.string.isRequired,
};

export default ConfigureProjectModal;

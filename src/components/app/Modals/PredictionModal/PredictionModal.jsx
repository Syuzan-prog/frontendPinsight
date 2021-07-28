import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import Typography from '@material-ui/core/Typography';

import TextInput from 'components/common/TextInput';
import Button from 'components/common/Button';
import Select from 'components/common/Select';

import {
    PREDICTION_NAME_FIELD_NAME,
    PREDICTION_DESCRIPTION_FIELD_NAME,
    PREDICTION_DATA_FIELD_NAME,
    PREDICTION_PROJECT_FIELD_NAME,
} from 'constants/prediction.constants';
import { fetchReadyDatasources } from 'core/dataFetchers/datasources';
import { fetchTrainedProjects } from 'core/dataFetchers/projects';

import Modal from '../Modal';
import useStyles from './PredictionModal.styles';

const PredictionModal = ({ onClose, handleSubmit, entityId, invalid, submitting, defaultOptions }) => {
    const classes = useStyles();

    return (
        <Modal onClose={onClose}>
            <div className={classes.container}>
                <Typography variant="h5">{entityId ? 'Configure Prediction' : 'Create Prediction'}</Typography>
                <Typography variant="body2" className={classes.popupDesc}>
                    {
                        entityId
                            ? 'Edit prediction information.'
                            : 'Select a project and data that you want to use to make the prediction.'
                    }
                </Typography>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <div className={classes.content}>
                        <Field
                            component={TextInput}
                            name={PREDICTION_NAME_FIELD_NAME}
                            type="text"
                            label="Name"
                            className={classes.settingsInput}
                            helperText="Name your prediction to easily identify it."
                            isRequired
                        />
                        <Field
                            component={TextInput}
                            name={PREDICTION_DESCRIPTION_FIELD_NAME}
                            type="text"
                            label="Description(optional)"
                            className={clsx(classes.settingsInput, classes.inputMarginTop)}
                            helperText="Provide a short description of your prediction."
                        />
                        <Field
                            component={Select}
                            name={PREDICTION_DATA_FIELD_NAME}
                            placeholder="Select"
                            label="Data"
                            className={clsx(classes.settingsInput, classes.inputMarginTop)}
                            helperText="Choose the data on which you want to make predictions."
                            getOptions={fetchReadyDatasources}
                            defaultOptions={defaultOptions[PREDICTION_DATA_FIELD_NAME]}
                            disabled={!!entityId}
                            isRequired
                        />
                        <Field
                            component={Select}
                            name={PREDICTION_PROJECT_FIELD_NAME}
                            label="Project"
                            placeholder="Select"
                            className={clsx(classes.settingsInput, classes.inputMarginTop)}
                            helperText="Choose your trained model from your projects."
                            getOptions={fetchTrainedProjects}
                            defaultOptions={defaultOptions[PREDICTION_PROJECT_FIELD_NAME]}
                            disabled={!!entityId}
                            isRequired
                        />
                    </div>
                    <div className={classes.buttonContainer}>
                        <Button
                            type="submit"
                            className={classes.button}
                            color="primary"
                            variant="contained"
                            disabled={submitting || invalid}
                        >
                            {entityId ? 'Save Changes' : 'Create Prediction'}
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

PredictionModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    entityId: PropTypes.string,
    invalid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    defaultOptions: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

PredictionModal.defaultProps = {
    entityId: '',
    defaultOptions: {},
};

export default PredictionModal;

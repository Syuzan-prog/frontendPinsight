import React, { useMemo } from 'react';
import { formValueSelector } from 'redux-form';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import {
    PROJECT_FORM_NAME,
    PROJECT_DATA_FIELD_NAME,
    PROJECT_PREDICTION_TYPE_FIELD_NAME,
} from 'constants/project.constants';

import styles from './CreateProjectForm.scss';

const CreateProjectForm = ({ steps, activeStep }) => {
    const { heading, description, getContent } = useMemo(() => steps[activeStep], [steps, activeStep]);
    const datasourceId = useSelector((state) => formValueSelector(PROJECT_FORM_NAME)(state, PROJECT_DATA_FIELD_NAME));
    const projectType = useSelector((state) =>
        formValueSelector(PROJECT_FORM_NAME)(state, PROJECT_PREDICTION_TYPE_FIELD_NAME));

    return (
        <>
            <div className={styles.header}>
                <Typography variant="h5" color="textPrimary" classes={{ root: styles.heading }}>{heading}</Typography>
                <Stepper activeStep={activeStep}>
                    {steps.map((step) => (
                        <Step key={`step-${step.description}`} completed={step.isCompleted}>
                            <StepLabel />
                        </Step>
                    ))}
                </Stepper>
                <Typography variant="body2" color="textSecondary" classes={{ root: styles.description }}>
                    {description}
                </Typography>
            </div>
            {getContent(datasourceId, projectType)}
        </>
    );
};

CreateProjectForm.propTypes = {
    steps: PropTypes.arrayOf(PropTypes.shape({
        heading: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        getContent: PropTypes.func.isRequired,
        isCompleted: PropTypes.bool.isRequired,
    })),
    activeStep: PropTypes.number.isRequired,
};

export default CreateProjectForm;

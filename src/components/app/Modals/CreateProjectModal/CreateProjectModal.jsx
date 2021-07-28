import React, { useState, useMemo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import Button from 'components/common/Button';
import {
    PROJECT_PREDICTION_TYPE_FIELD_NAME,
} from 'constants/project.constants';

import Modal from '../Modal';

import PredictionTypeGrid from './PredictionTypeGrid';
import CreateProjectForm from './CreateProjectForm';
import defaultSteps from './defaultSteps';
import styles from './CreateProjectModal.scss';

const CreateProjectModal = ({ onClose, handleSubmit, change, invalid, submitting }) => {
    const [predictionType, setPredictionType] = useState(null);
    const [step, setStep] = useState(0);
    const [steps, setSteps] = useState(defaultSteps);

    const isPredictionTypeStep = useMemo(() => step === 0, [step]);
    const isLastStep = useMemo(() => step === steps.length, [step, steps.length]);

    const markStepCompleted = useCallback(() => {
        const newSteps = [...steps];
        newSteps[step - 1].isCompleted = true;

        setSteps(newSteps);
    }, [step, steps, setSteps]);
    const handleBackClick = useCallback(() => {
        setStep((prevStep) => prevStep - 1);
    }, []);

    const handleNextClick = useCallback((e) => {
        e.preventDefault();
        if (!isPredictionTypeStep) {
            markStepCompleted();
        }

        setStep((prevStep) => prevStep + 1);
    }, [markStepCompleted, isPredictionTypeStep]);

    useEffect(() => {
        if (predictionType) {
            change(PROJECT_PREDICTION_TYPE_FIELD_NAME, predictionType);
        }
    }, [predictionType, change]);

    const handleCreateClick = useCallback((...args) => {
        markStepCompleted();
        handleSubmit(...args);
    }, [markStepCompleted, handleSubmit]);

    return (
        <Modal onClose={onClose} className={styles.modal} withBackground={!isPredictionTypeStep}>
            <form onSubmit={handleCreateClick}>
                {isPredictionTypeStep ? (
                    <PredictionTypeGrid selectedPredictionType={predictionType} setPredictionType={setPredictionType} />
                ) : <CreateProjectForm steps={steps} activeStep={step - 1} />}
                <div className={styles.actions}>
                    {isLastStep ? (
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={styles.actionButton}
                            disabled={invalid || submitting}
                        >
                            create project
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            className={styles.actionButton}
                            disabled={!predictionType || invalid}
                            onClick={handleNextClick}
                        >
                            next
                            <ArrowForwardIcon className="m-l-12" />
                        </Button>
                    )}
                    {!isPredictionTypeStep && (
                        <Button
                            variant="outlined"
                            color="primary"
                            className={styles.actionButton}
                            disabled={!predictionType}
                            onClick={handleBackClick}
                        >
                            <ArrowBackIcon className="m-r-12" />
                            back
                        </Button>
                    )}
                </div>
            </form>
        </Modal>
    );
};

CreateProjectModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
};

export default CreateProjectModal;

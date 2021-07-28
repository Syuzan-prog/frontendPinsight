import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import Option from './Option';
import options from './options';

import styles from '../CreateProjectModal.scss';

const PredictionTypeGrid = ({ selectedPredictionType, setPredictionType }) => (
    <>
        <div className={styles.header}>
            <Typography variant="h5" color="textPrimary">What do you want to predict?</Typography>
            <Typography variant="body2" color="textSecondary" classes={{ root: styles.description }}>
                Please choose your prediction type to help us build the right model for you.
            </Typography>
        </div>
        <div className={styles.optionGrid}>
            {options.map((option) => (
                <Option
                    key={option.name}
                    {...option}
                    isSelected={selectedPredictionType === option.name}
                    onClick={setPredictionType}
                />
            ))}
        </div>
    </>
);

PredictionTypeGrid.propTypes = {
    setPredictionType: PropTypes.func.isRequired,
    selectedPredictionType: PropTypes.string,
};

export default PredictionTypeGrid;

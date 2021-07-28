import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import styles from '../Evaluate.scss';

/* eslint-disable camelcase */
const ConfusionMatrix = ({ matrix: {
    true_negative,
    false_negative,
    false_positive,
    true_positive,
}, targetVariable,
}) => (
    <Paper className={styles.matrixContainer}>
        <Typography variant="overline">Confusion matrix</Typography>
        <div className={styles.matrix}>
            <div className={styles.column}>
                <div className={styles.cell} />
                <div className={styles.cell}>
                    <Typography variant="caption" color="textSecondary">
                        Actual no
                        {' '}
                        {targetVariable}
                    </Typography>
                </div>
                <div className={styles.cell}>
                    <Typography variant="caption" color="textSecondary">
                        Actual
                        {' '}
                        {targetVariable}
                    </Typography>
                </div>
            </div>
            <div className={styles.column}>
                <div className={styles.cell}>
                    <Typography variant="caption" color="textSecondary">
                        Predicted no
                        {' '}
                        {targetVariable}
                    </Typography>
                </div>
                <div className={styles.true_negative}>
                    <Typography variant="caption">True Negative</Typography>
                    <Typography variant="h6">{true_negative}</Typography>
                </div>
                <div className={styles.false_negative}>
                    <Typography variant="caption">False Negative</Typography>
                    <Typography variant="h6">{false_negative}</Typography>
                </div>
            </div>
            <div className={styles.column}>
                <div className={styles.cell}>
                    <Typography variant="caption" color="textSecondary">
                        Predicted
                        {' '}
                        {targetVariable}
                    </Typography>
                </div>
                <div className={styles.false_positive}>
                    <Typography variant="caption">False Positive</Typography>
                    <Typography variant="h6">{false_positive}</Typography>
                </div>
                <div className={styles.true_positive}>
                    <Typography variant="caption">True Positive</Typography>
                    <Typography variant="h6">{true_positive}</Typography>
                </div>
            </div>
        </div>
    </Paper>
);
/* eslint-enable camelcase */

ConfusionMatrix.propTypes = {
    matrix: PropTypes.shape({
        true_negative: PropTypes.number,
        false_positive: PropTypes.number,
        false_negative: PropTypes.number,
        true_positive: PropTypes.number,
    }),
    targetVariable: PropTypes.string,
};

ConfusionMatrix.defaultProps = {
    matrix: {},
};

export default ConfusionMatrix;

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import CachedIcon from '@material-ui/icons/Cached';
import { makeStyles } from '@material-ui/core/styles';

import Button from 'components/common/Button';

import styles from '../Evaluate.scss';

const useStyles = makeStyles({
    mark: ({ optimalThresholdIndex }) => {
        const key = `&[data-index="${optimalThresholdIndex}"]`;

        return {
            [key]: {
                top: '10px',
                width: '8px',
                height: '8px',
                color: '#FF7542',
                backgroundColor: '#FF7542',
                borderRadius: '50%',
                transform: 'translateX(-6px)',
                opacity: 1,
            },
        };
    },
    markLabel: ({ optimalThresholdIndex }) => {
        const key = `&[data-index="${optimalThresholdIndex}"]`;

        return {
            [key]: {
                top: '42px',
            },
        };
    },
});

const Threshold = ({ optimalThreshold, fetchEvaluateData, thresholdSteps }) => {
    const [threshold, setThreshold] = useState(optimalThreshold);

    useEffect(() => {
        setThreshold(optimalThreshold);
    }, [optimalThreshold]);

    const marks = useMemo(() => thresholdSteps.map((step) => (step.value === optimalThreshold
        ? { ...step, label: `Optimal Threshold: ${Math.round(optimalThreshold * 100)}%` } : step)), [thresholdSteps, optimalThreshold]);

    const handleThresholdChange = useCallback((event, value) => {
        setThreshold(value);
    }, []);

    const handleThresholdChangeCommit = useCallback((event, value) => {
        setThreshold(value);
        fetchEvaluateData(value);
    }, [fetchEvaluateData]);

    const handleReset = useCallback(() => setThreshold(optimalThreshold), [optimalThreshold]);

    const formatValueText = useCallback((value) => `${Math.round(value * 100)}%`, []);

    const optimalThresholdIndex = useMemo(() =>
        thresholdSteps.findIndex((step) => step.value === optimalThreshold), [thresholdSteps, optimalThreshold]);

    const classes = useStyles({ optimalThresholdIndex });

    return (
        <Paper className={styles.thresholdContainer}>
            <div className={styles.header}>
                <Typography variant="overline">Treshold</Typography>
                <Button variant="text" onClick={handleReset}>
                    <CachedIcon className="m-r-8" fontSize="small" />
                    reset
                </Button>
            </div>
            <div className={styles.sliderContainer}>
                <Typography variant="body2" className={styles.leftRange}>0%</Typography>
                <Typography variant="body2" className={styles.rightRange}>100%</Typography>
                <Slider
                    classes={{
                        mark: classes.mark,
                        markLabel: classes.markLabel,
                        valueLabel: styles.valueLabel,
                    }}
                    valueLabelDisplay="on"
                    marks={marks}
                    value={threshold}
                    onChange={handleThresholdChange}
                    onChangeCommitted={handleThresholdChangeCommit}
                    valueLabelFormat={formatValueText}
                    step={null}
                    max={1}
                />
            </div>
        </Paper>
    );
};

Threshold.propTypes = {
    optimalThreshold: PropTypes.number.isRequired,
    fetchEvaluateData: PropTypes.func.isRequired,
    thresholdSteps: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.number,
    })),
};

Threshold.defaultProps = {
    thresholdSteps: [],
};

export default Threshold;

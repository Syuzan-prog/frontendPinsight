import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import styles from '../Evaluate.scss';

// subject to refactoring later
const xAxisCategories = ['Very Low', 'Low', 'Neutral', 'High', 'Very High'];
const yAxisCategories = ['Very High', 'High', 'Neutral', 'Low', 'Very Low'];

/* eslint-disable react/no-array-index-key */
const RPSegmentPlot = ({ data }) => (
    <Paper className={styles.rpSegmentPlotContainer}>
        <Typography variant="overline">Real vs Predicted Segment plot</Typography>
        <div className={styles.segmentPlotContainer}>
            <div className={styles.yContainer}>
                <Typography variant="caption" className={styles.yLabel}>Real Segment</Typography>
                <div className={styles.yAxisLabels}>
                    {yAxisCategories.map((category, index) => (
                        <div key={index} className={styles.label}>
                            {category}
                        </div>
                    ))}
                </div>
                <div className={styles.table}>
                    {data.map((row, rowIndex) => (
                        <div key={rowIndex} className={styles.row}>
                            {row.map((cell, cellIndex) => (
                                <div key={cellIndex} className={styles.cell} style={cell.style}>
                                    <Typography variant="caption">{cell.value}</Typography>
                                </div>
                          ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.xContainer}>
                <div className={styles.xAxisLabels}>
                    {xAxisCategories.map((category, index) => (
                        <div key={index} className={styles.label}>
                            {category}
                        </div>
                    ))}
                </div>
                <Typography variant="caption" className={styles.xLabel}>Predicted Segment</Typography>
            </div>
        </div>
    </Paper>
);
/* eslint-enable react/no-array-index-key */

RPSegmentPlot.propTypes = {
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.number,
        background: PropTypes.string,
    }))),
};

export default RPSegmentPlot;

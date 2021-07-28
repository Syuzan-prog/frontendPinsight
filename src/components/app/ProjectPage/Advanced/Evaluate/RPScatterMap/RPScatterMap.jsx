import React from 'react';
import PropTypes from 'prop-types';
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Label,
    ReferenceLine,
    ResponsiveContainer,
} from 'recharts';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import styles from '../Evaluate.scss';

const baseStyles = { fontSize: 12, letterSpacing: 0.4, fill: '#A4A4A4' };
const labelStyles = { ...baseStyles, textAnchor: 'middle' };
const tickStyles = { ...baseStyles, margin: 20 };

const renderScatter = ({ cx, cy, fill }) => (
    <circle cx={cx} cy={cy} fill={fill} r={2.5} />
);

const RPScatterMap = ({ data: { line, scatter } }) => (
    <Paper className={styles.chartContainer}>
        <Typography variant="overline">Reality vs predictions</Typography>
        <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
                margin={{
                    top: 80,
                    bottom: 40,
                    left: 20,
                }}
            >
                <CartesianGrid fill="#EEF7EE" stroke="#FFFFFF" />
                <XAxis
                    type="number"
                    dataKey="x"
                    tick={tickStyles}
                >
                    <Label
                        position="bottom"
                        style={labelStyles}
                    >
                        Real Values
                    </Label>
                </XAxis>
                <YAxis
                    type="number"
                    dataKey="y"
                    tick={tickStyles}
                    label={{
                        position: 'insideLeft',
                        angle: -90,
                        style: labelStyles,
                        value: 'Predicted Values',
                    }}
                />
                <Scatter data={scatter} fill="#4CAF50" shape={renderScatter} />
                <ReferenceLine
                    segment={line}
                    stroke="#3B873E"
                    strokeWidth={1}
                />
            </ScatterChart>
        </ResponsiveContainer>
    </Paper>
);

RPScatterMap.propTypes = {
    data: PropTypes.shape({
        line: PropTypes.arrayOf(PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number,
            magnitude: PropTypes.number,
        })),
        scatter: PropTypes.arrayOf(PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number,
        })),
    }),
};

export default RPScatterMap;

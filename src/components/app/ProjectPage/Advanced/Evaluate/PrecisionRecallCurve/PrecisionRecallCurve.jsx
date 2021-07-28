import React from 'react';
import PropTypes from 'prop-types';
import {
    AreaChart,
    Area,
    ReferenceDot,
    Legend,
    Label,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
} from 'recharts';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import styles from '../Evaluate.scss';

const baseStyles = { fontSize: 12, letterSpacing: 0.4, fill: '#A4A4A4' };
const labelStyles = { ...baseStyles, textAnchor: 'middle' };
const tickStyles = { ...baseStyles, margin: 20 };
const legendStyles = { fontSize: 12, letterSpacing: 0.4, color: '#A4A4A4' };

const legendFormatter = (value) => <span style={legendStyles}>{value}</span>;

const PrecisionRecallCurve = ({ data, thresholdPoint, currentThreshold, auc }) => (
    <Paper className={styles.chartContainer}>
        <Typography variant="overline">Precision-Recall Curve</Typography>
        <ResponsiveContainer height="100%" width="100%">
            <AreaChart
                data={data}
                margin={{ left: 24, bottom: 48, right: 24, top: 24 }}
            >
                <CartesianGrid style={{ stroke: '#CCCCCC' }} />
                <XAxis
                    dataKey="x"
                    type="number"
                    tick={tickStyles}
                >
                    <Label
                        position="bottom"
                        style={labelStyles}
                    >
                        Recall
                    </Label>
                </XAxis>
                <YAxis
                    type="number"
                    tick={tickStyles}
                    label={{
                        position: 'insideLeft',
                        angle: -90,
                        style: labelStyles,
                        value: 'Precision',
                    }}
                />
                <Legend
                    verticalAlign="top"
                    align="right"
                    height={36}
                    formatter={legendFormatter}
                />
                <Area
                    name="Precision-Recall"
                    type="linear"
                    dataKey="y"
                    stroke="#1F4620"
                    strokeWidth={3}
                    fill="rgba(76, 175, 80, 0.5)"
                />
                <ReferenceDot
                    x={thresholdPoint.x}
                    y={thresholdPoint.y}
                    r={8}
                    strokeWidth={0}
                    fill="#1F4620"
                />
                <Area
                    name={`Threshold ${Math.round(currentThreshold * 100)}%`}
                    dataKey={null}
                    stroke="#1F4620"
                    legendType="circle"
                />
                <ReferenceDot
                    x={0.5}
                    y={0.2}
                    r={0}
                    strokeWidth={0}
                >
                    <Label style={labelStyles}>
                        {`AUC = ${auc.toFixed(3)}`}
                    </Label>
                </ReferenceDot>
            </AreaChart>
        </ResponsiveContainer>
    </Paper>
);

PrecisionRecallCurve.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
    })),
    thresholdPoint: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
    }),
    currentThreshold: PropTypes.number,
    auc: PropTypes.number,
};

PrecisionRecallCurve.defaultProps = {
    thresholdPoint: {},
};

export default PrecisionRecallCurve;

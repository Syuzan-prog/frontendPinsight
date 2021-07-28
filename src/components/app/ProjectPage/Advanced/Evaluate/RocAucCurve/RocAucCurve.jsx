import React from 'react';
import PropTypes from 'prop-types';
import {
    AreaChart,
    Area,
    ReferenceDot,
    ReferenceLine,
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
const referenceLineCoordinates = [{ x: 0, y: 0 }, { x: 1, y: 1 }];

const RocAucCurve = ({ data, thresholdPoint, currentThreshold, auc }) => (
    <Paper className={styles.chartContainer}>
        <Typography variant="overline">ROC-AUC Curve</Typography>
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
                        False Positive Rate
                    </Label>
                </XAxis>
                <YAxis
                    type="number"
                    tick={tickStyles}
                    label={{
                        position: 'insideLeft',
                        angle: -90,
                        style: labelStyles,
                        value: 'True Positive Rate',
                    }}
                />
                <Legend
                    verticalAlign="top"
                    align="right"
                    height={36}
                    formatter={legendFormatter}
                />
                <Area
                    name="ROC"
                    type="linear"
                    dataKey="y"
                    stroke="#2D2D9A"
                    strokeWidth={3}
                    fill="rgba(85, 85, 206, 0.08)"
                />
                <ReferenceDot
                    x={thresholdPoint.x}
                    y={thresholdPoint.y}
                    r={8}
                    strokeWidth={0}
                    fill="#2D2D9A"
                />
                <ReferenceLine
                    segment={referenceLineCoordinates}
                    stroke="#2D2D9A"
                    strokeWidth={0.8}
                />
                <Area
                    name="Random Guess"
                    dataKey={null}
                    stroke="#2D2D9A"
                    legendType="plainline"
                />
                <Area
                    name={`Threshold ${Math.round(currentThreshold * 100)}%`}
                    dataKey={null}
                    stroke="#2D2D9A"
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

RocAucCurve.propTypes = {
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

RocAucCurve.defaultProps = {
    thresholdPoint: {},
};

export default RocAucCurve;

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

const EPScatterMap = ({ data: { scatter } }) => (
    <Paper className={styles.chartContainer}>
        <Typography variant="overline">Errors vs predictions</Typography>
        <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
                margin={{
                    top: 80,
                    bottom: 40,
                    left: 20,
                }}
            >
                <CartesianGrid fill="#F1F1FB" stroke="#FFFFFF" />
                <XAxis
                    type="number"
                    dataKey="x"
                    tick={tickStyles}
                >
                    <Label
                        position="bottom"
                        style={labelStyles}
                    >
                        Predicted Values
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
                        value: 'Errors',
                    }}
                />
                <Scatter data={scatter} fill="#FF9A75" shape={renderScatter} />
                <ReferenceLine
                    y={0}
                    stroke="#E63E00"
                    strokeWidth={2}
                />
            </ScatterChart>
        </ResponsiveContainer>
    </Paper>
);

EPScatterMap.propTypes = {
    data: PropTypes.shape({
        scatter: PropTypes.arrayOf(PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number,
        })),
    }),
};

export default EPScatterMap;

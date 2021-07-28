import React from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, Label, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import styles from '../Evaluate.scss';

const baseStyles = { fontSize: 12, letterSpacing: 0.4, fill: '#A4A4A4' };
const labelStyles = { ...baseStyles, textAnchor: 'middle' };
const tickStyles = { ...baseStyles, margin: 20 };
const legendStyles = { fontSize: 12, letterSpacing: 0.4, color: '#A4A4A4' };

const xAxisTicks = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

const legendFormatter = (value) => <span style={legendStyles}>{value}</span>;

const LiftChart = ({ data }) => (
    <Paper className={styles.chartContainer}>
        <Typography variant="overline">Lift Chart</Typography>
        <ResponsiveContainer height="100%" width="100%">
            <LineChart
                data={data}
                margin={{ left: 24, bottom: 48, right: 24, top: 24 }}
            >
                <CartesianGrid style={{ stroke: '#CCCCCC' }} />
                <XAxis
                    dataKey="x"
                    type="number"
                    domain={[0, 100]}
                    tickFormatter={(tick) => `${tick}%`}
                    tick={tickStyles}
                    ticks={xAxisTicks}
                >
                    <Label
                        position="bottom"
                        style={labelStyles}
                    >
                        % of data sets
                    </Label>
                </XAxis>
                <YAxis
                    type="number"
                    tick={tickStyles}
                    allowDecimals={false}
                    label={{
                        position: 'insideLeft',
                        angle: -90,
                        style: labelStyles,
                        value: 'Lift',
                    }}
                />
                <Legend
                    verticalAlign="top"
                    align="right"
                    height={36}
                    formatter={legendFormatter}
                />
                <Line
                    name="Lift (Model)"
                    type="linear"
                    dataKey="y"
                    stroke="#FF7542"
                    strokeWidth={3}
                    dot={{ fill: '#E63E00', stroke: '#E63E00' }}
                />
                <Line
                    name="Lift (Random)"
                    type="linear"
                    dataKey="random"
                    stroke="#424242"
                    dot={{ fill: '#575757', stroke: '#575757' }}
                />
            </LineChart>
        </ResponsiveContainer>
    </Paper>
);

LiftChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
    })),
};

export default LiftChart;

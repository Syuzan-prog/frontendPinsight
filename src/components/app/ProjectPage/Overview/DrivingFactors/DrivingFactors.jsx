import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { BarChart, Bar, Cell, XAxis, YAxis, Legend, Label, ResponsiveContainer } from 'recharts';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import styles from '../Overview.scss';

const renderLegend = () => (
    <div className={styles.factorsLegend}>
        <span data-identity="mixed">Mixed</span>
        <span data-identity="positive">Positive</span>
        <span data-identity="negative">Negative</span>
    </div>
);

const colorMap = {
    MIXED: '#BDBDBD',
    POSITIVE: '#7C7CD9',
    NEGATIVE: '#FF9A75',
};

const DrivingFactors = ({ drivingFactors }) => {
    const [open, setOpen] = useState();
    const [showCount, setShowCount] = useState(10);
    const dataToShow = useMemo(() => drivingFactors.slice(0, showCount), [showCount, drivingFactors]);
    const tickStyles = useMemo(() => ({ fontSize: 12, letterSpacing: 0.4, fill: 'rgba(0, 0, 0, 0.54)' }), []);
    const xAxisDomain = useMemo(() => [0, Number(drivingFactors[0]?.value.toFixed(2))], [drivingFactors]);

    return (
        <Paper className={clsx(styles.block, styles.largeChart, styles.drivingFactors)}>
            <div className={styles.header}>
                <Typography variant="overline" className={styles.label}>key driving factors</Typography>
                <FormControl className={styles.showCount}>
                    <InputLabel id="table-show-count">Show:</InputLabel>
                    <Select
                        labelId="table-show-count"
                        open={open}
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        value={showCount}
                        onChange={(event) => setShowCount(event.target.value)}
                        variant="standard"
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <ResponsiveContainer height="100%" width="100%">
                <BarChart
                    data={dataToShow}
                    layout="vertical"
                    margin={{ bottom: 24 }}
                >
                    <XAxis
                        dataKey="value"
                        domain={xAxisDomain}
                        type="number"
                        tickFormatter={(tick) => `${Math.round(tick * 100)}%`}
                        tick={tickStyles}
                    >
                        <Label
                            position="bottom"
                            style={{ ...tickStyles, fill: 'rgba(0, 0, 0, 0.34)' }}
                        >
                            Relative Importance
                        </Label>
                    </XAxis>
                    <YAxis
                        dataKey="name"
                        type="category"
                        interval={0}
                        width={150}
                        tick={tickStyles}
                    />
                    <Bar dataKey="value">
                        {dataToShow.map((entry) => (
                            <Cell key={`cell-${entry.name}`} fill={colorMap[entry.sign]} />
                        ))}
                    </Bar>
                    <Legend
                        verticalAlign="top"
                        align="right"
                        content={renderLegend}
                    />
                </BarChart>
            </ResponsiveContainer>
        </Paper>
    );
};

DrivingFactors.propTypes = {
    drivingFactors: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.number,
        sign: PropTypes.oneOf(['POSITIVE', 'NEGATIVE']),
    })),
};

DrivingFactors.defaultProps = {
    drivingFactors: [],
};

export default DrivingFactors;

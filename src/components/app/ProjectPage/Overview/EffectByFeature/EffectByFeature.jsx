import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { ComposedChart, Area, XAxis, YAxis, Label, CartesianGrid, ResponsiveContainer } from 'recharts';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { processNumber, getProjectEffectByFeature, getProjectFeatures } from 'state/selectors/projects.selectors';
import {
    PROJECT_TYPES,
    PREDICTION_TYPE_YES_NO,
} from 'constants/project.constants';

import styles from '../Overview.scss';

const baseStyles = { fontSize: 12, letterSpacing: 0.4, fill: '#A4A4A4' };
const labelStyles = { ...baseStyles, textAnchor: 'middle' };
const tickStyles = { ...baseStyles, margin: 20 };

const EffectByFeature = ({ targetVariable, projectType }) => {
    const [open, setOpen] = useState();
    const [selectedFeature, setSelectedFeature] = useState('');

    const features = useSelector(getProjectFeatures);
    const data = useSelector((state) => getProjectEffectByFeature(state, selectedFeature), [selectedFeature]);

    useEffect(() => {
        setSelectedFeature(features[0]);
    }, [features]);

    const yAxisConfig = useMemo(() => (projectType === PREDICTION_TYPE_YES_NO
        ? { tickFormatter: (tick) => `${processNumber(tick * 100)}%` }
        : { tickFormatter: (tick) => `$${processNumber(tick)}` }), [projectType]);

    return (
        <Paper className={clsx(styles.block, styles.largeChart, styles.effectByFeature)}>
            <div className={styles.header}>
                <Typography variant="overline" className={styles.label}>
                    the effect of
                    {' '}
                    {selectedFeature}
                    {' '}
                    on
                    {' '}
                    {targetVariable}
                </Typography>
                <FormControl className={styles.featureSelect}>
                    <Select
                        MenuProps={{
                            classes: {
                                paper: styles.selectMenu,
                            },
                        }}
                        labelId="table-show-count"
                        open={open}
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        value={selectedFeature}
                        onChange={(event) => setSelectedFeature(event.target.value)}
                        variant="filled"
                        disableUnderline
                    >
                        {features.map((feature) => <MenuItem key={feature} value={feature}>{feature}</MenuItem>)}
                    </Select>
                </FormControl>
            </div>
            <ResponsiveContainer height="100%" width="100%">
                <ComposedChart
                    data={data}
                    margin={{ left: 24, bottom: 24 }}
                >
                    <CartesianGrid style={{ stroke: 'rgba(85, 85, 206, 0.08)' }} />
                    <XAxis
                        dataKey="x"
                        type="number"
                        domain={['dataMin', 'dataMax']}
                        tickFormatter={(tick) => (Number.isInteger(tick) ? tick : Number(tick.toFixed(3)).toString())}
                        tick={tickStyles}
                    >
                        <Label
                            position="bottom"
                            style={labelStyles}
                        >
                            {selectedFeature}
                        </Label>
                    </XAxis>
                    <YAxis
                        dataKey="y"
                        type="number"
                        {...yAxisConfig}
                        tick={tickStyles}
                        label={{
                            position: 'insideLeft',
                            angle: -90,
                            style: labelStyles,
                            value: `${projectType === PREDICTION_TYPE_YES_NO ? 'Likelihood of' : 'Estimated'} ${targetVariable}`,
                        }}
                    />
                    <Area
                        type="linear"
                        dataKey="y"
                        stroke="#4CAF50"
                        fill="rgba(76, 175, 80, 0.1)"
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </Paper>
    );
};

EffectByFeature.propTypes = {
    targetVariable: PropTypes.string,
    projectType: PropTypes.oneOf(PROJECT_TYPES),
};

export default EffectByFeature;

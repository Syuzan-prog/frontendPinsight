import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { MODEL_HEALTH_SEGMENTS } from 'constants/project.constants';

import {
    getModelHealthNode,
    getModelHealthDescription,
    renderActiveShape,
} from './ModelHealth.utils';

import styles from '../Overview.scss';

const ModelHealth = ({ modelHealth: { accuracy, fairness } }) => (
    <Paper className={clsx(styles.block, styles.modelHealth)}>
        <div className={styles.header}>
            <Typography variant="overline" className={styles.label}>Model health</Typography>
        </div>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Typography variant="subtitle2" className="m-b-14">Accuracy</Typography>
                <ResponsiveContainer height="100%">
                    <PieChart margin={{ top: 10 }}>
                        <Pie
                            data={MODEL_HEALTH_SEGMENTS}
                            activeIndex={1}
                            activeShape={(props) => renderActiveShape(props, accuracy)}
                            cy={80}
                            startAngle={180}
                            endAngle={0}
                            innerRadius={50}
                            outerRadius={80}
                            paddingAngle={0}
                            dataKey="value"
                            isAnimationActive={false}
                        >
                            {MODEL_HEALTH_SEGMENTS.map((segment) => (
                                <Cell key={`cell-${segment.name}`} fill={segment.color} stroke="none" />
                            ))}
                            <Legend position="bottom">
                                {accuracy}
                                %
                            </Legend>
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                {getModelHealthNode(accuracy)}
                {getModelHealthDescription('accuracy', accuracy)}
            </Grid>
            <Grid item xs={6}>
                {
                    fairness ? (
                        <>
                            <Typography variant="subtitle2" className="m-b-14">Fairness</Typography>
                            <ResponsiveContainer height="100%">
                                <PieChart margin={{ top: 10 }}>
                                    <Pie
                                        data={MODEL_HEALTH_SEGMENTS}
                                        activeIndex={1}
                                        activeShape={(props) => renderActiveShape(props, fairness)}
                                        cy={80}
                                        startAngle={180}
                                        endAngle={0}
                                        innerRadius={50}
                                        outerRadius={80}
                                        paddingAngle={0}
                                        dataKey="value"
                                        isAnimationActive={false}
                                    >
                                        {MODEL_HEALTH_SEGMENTS.map((segment) => (
                                            <Cell key={`cell-${segment.name}`} fill={segment.color} stroke="none" />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            {getModelHealthNode(fairness)}
                            {getModelHealthDescription('fairness', fairness)}
                        </>
                    ) : (
                        <div className={styles.noFairness}>
                            <Typography variant="subtitle2">Fairness is not available.</Typography>
                            <Typography variant="caption" color="textSecondary">No sensitive feature was detected.</Typography>
                        </div>
                    )
                }
            </Grid>
        </Grid>
    </Paper>

);

ModelHealth.propTypes = {
    modelHealth: PropTypes.shape({
        accuracy: PropTypes.string,
        fairness: PropTypes.string,
    }),
};

export default ModelHealth;

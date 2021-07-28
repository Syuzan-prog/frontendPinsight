import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import styles from './CurrentPlan.scss';

const CurrentPlan = ({
    name,
    daysUsed,
    daysOverall,
    type,
    projectsUsed,
    predictionsUsed,
    datasourcesUsed,
    projectsLimit,
    predictionsLimit,
    datasourcesLimit,
}) => (
    <div className={styles.block}>
        <Typography variant="subtitle1">Current Plan</Typography>
        <Typography variant="body2" color="textSecondary">
            Information on your current subsciprtion
        </Typography>

        <Grid container className={styles.grid}>
            <Grid item md={2}>
                <Typography variant="subtitle2">Plan Name</Typography>
                <Typography variant="body2" className={styles.body}>
                    {name}
                </Typography>
            </Grid>
            {type === 'TRIAL' && (
                <Grid item md={2} className={styles.borderRight}>
                    <Typography variant="subtitle2">Free trial (used)</Typography>
                    <Typography variant="body2" className={styles.body}>
                        <span>{daysUsed}</span>
                        {' '}
                        /
                        {daysOverall || '∞'}
                    </Typography>
                </Grid>
            )}
            <Grid item md={3} className={styles.projects}>
                <Typography variant="subtitle2">Projects (used)</Typography>
                <Typography variant="body2" className={styles.body}>
                    <span>{projectsUsed}</span>
                    /
                    {projectsLimit}
                </Typography>
            </Grid>
            <Grid item md={2}>
                <Typography variant="subtitle2">Predictions (used)</Typography>
                <Typography variant="body2" className={styles.body}>
                    <span>{predictionsUsed}</span>
                    /
                    {predictionsLimit}
                </Typography>
            </Grid>
            <Grid item md={2}>
                <Typography variant="subtitle2">Datasets (used)</Typography>
                <Typography variant="body2" className={styles.body}>
                    <span>{datasourcesUsed}</span>
                    /
                    {datasourcesLimit}
                </Typography>
            </Grid>
        </Grid>
    </div>
);

CurrentPlan.propTypes = {
    name: PropTypes.string,
    daysUsed: PropTypes.number,
    daysOverall: PropTypes.number,
    type: PropTypes.string,
    projectsUsed: PropTypes.number,
    projectsLimit: PropTypes.number,
    predictionsUsed: PropTypes.number,
    predictionsLimit: PropTypes.number,
    datasourcesUsed: PropTypes.number,
    datasourcesLimit: PropTypes.number,
};

export default CurrentPlan;

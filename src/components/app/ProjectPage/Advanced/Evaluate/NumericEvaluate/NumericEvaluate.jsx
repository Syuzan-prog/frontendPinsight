import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Grid from '@material-ui/core/Grid';

import { LoaderContainer } from 'components/common/Loader';

import EvaluationMetrics from '../EvaluationMetrics';
import RPSegmentPlot from '../RPSegmentPlot';
import RPScatterMap from '../RPScatterMap';
import EPScatterMap from '../EPScatterMap';

import styles from '../Evaluate.scss';

const NumericEvaluate = ({ fetchEvaluateData, isLoading }) => {
    useEffect(() => {
        fetchEvaluateData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={styles.container}>
            <div className={styles.crumbs}>
                <Typography variant="body2" color="textSecondary">Advanced</Typography>
                <NavigateNextIcon fontSize="small" />
                <Typography variant="subtitle2">Evaluate</Typography>
            </div>
            <LoaderContainer isLoading={isLoading}>
                <Grid container spacing={2}>
                    <Grid item md={7}>
                        <EvaluationMetrics />
                    </Grid>
                    <Grid item md={5}>
                        <RPSegmentPlot />
                    </Grid>
                    <Grid item md={6}>
                        <RPScatterMap />
                    </Grid>
                    <Grid item md={6}>
                        <EPScatterMap />
                    </Grid>
                </Grid>
            </LoaderContainer>
        </div>
    );
};

NumericEvaluate.propTypes = {
    fetchEvaluateData: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export default NumericEvaluate;

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Grid from '@material-ui/core/Grid';

import { LoaderContainer } from 'components/common/Loader';

import Threshold from '../Threshold';
import EvaluationMetrics from '../EvaluationMetrics';
import ConfusionMatrix from '../ConfusionMatrix';
import RocAucCurve from '../RocAucCurve';
import PrecisionRecallCurve from '../PrecisionRecallCurve';
import LiftChart from '../LiftChart';
import GainChart from '../GainChart';

import styles from '../Evaluate.scss';

const CategoricalEvaluate = ({ fetchThreshold, isLoading, isMetaLoading }) => {
    useEffect(() => {
        fetchThreshold();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={styles.container}>
            <div className={styles.crumbs}>
                <Typography variant="body2" color="textSecondary">Advanced</Typography>
                <NavigateNextIcon fontSize="small" />
                <Typography variant="subtitle2">Evaluate</Typography>
            </div>
            <LoaderContainer isLoading={isLoading}>
                <Threshold />
                <LoaderContainer isLoading={isMetaLoading}>
                    <Grid container spacing={2}>
                        <Grid item md={7}>
                            <EvaluationMetrics />
                        </Grid>
                        <Grid item md={5}>
                            <ConfusionMatrix />
                        </Grid>
                        <Grid item md={6}>
                            <RocAucCurve />
                        </Grid>
                        <Grid item md={6}>
                            <PrecisionRecallCurve />
                        </Grid>
                        <Grid item md={6}>
                            <LiftChart />
                        </Grid>
                        <Grid item md={6}>
                            <GainChart />
                        </Grid>
                    </Grid>
                </LoaderContainer>
            </LoaderContainer>
        </div>
    );
};

CategoricalEvaluate.propTypes = {
    fetchThreshold: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isMetaLoading: PropTypes.bool.isRequired,
};

export default CategoricalEvaluate;

import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import { LoaderContainer } from 'components/common/Loader';

import SegmentsTable from './SegmentsTable';
import ModelHealth from './ModelHealth';
import DrivingFactors from './DrivingFactors';
import EffectByFeature from './EffectByFeature';

import styles from './Overview.scss';

const Overview = ({ isLoading }) => (
    <div className={styles.container}>
        <LoaderContainer isLoading={isLoading}>
            <Grid container spacing={2}>
                <Grid item md={6}>
                    <SegmentsTable />
                </Grid>
                <Grid item md={6}>
                    <ModelHealth />
                </Grid>
                <Grid item md={6}>
                    <DrivingFactors />
                </Grid>
                <Grid item md={6}>
                    <EffectByFeature />
                </Grid>
            </Grid>
        </LoaderContainer>
    </div>
);

Overview.propTypes = {
    isLoading: PropTypes.bool.isRequired,
};

export default Overview;

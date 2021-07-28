import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import { LoaderContainer } from 'components/common/Loader';

import ModelOverview from './ModelOverview';
import ApiPointList from './ApiPointList';
import DataOverview from './DataOverview';
import Other from './Other';

const InfoPage = ({ isLoading, fetchInfo }) => {
    useEffect(() => {
        fetchInfo();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <LoaderContainer isLoading={isLoading}>
            <Grid container spacing={2}>
                <Grid item md={7}>
                    <ModelOverview />
                </Grid>
                <Grid item md={5}>
                    <DataOverview />
                </Grid>
                <Grid item md={7}>
                    <ApiPointList />
                </Grid>
                <Grid item md={5}>
                    <Other />
                </Grid>
            </Grid>
        </LoaderContainer>
    );
};

InfoPage.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    fetchInfo: PropTypes.func.isRequired,
};

export default InfoPage;

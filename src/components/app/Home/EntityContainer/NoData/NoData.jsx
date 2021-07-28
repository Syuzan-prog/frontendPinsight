import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';

import styles from './NoData.scss';

const NoData = ({ entity }) => (
    <>
        <Typography className={styles.noDataHeader} variant="subtitle1">
            There are no
            {' '}
            {entity}
            {' '}
            here yet.
        </Typography>
        <span className={styles.noDataDesc}>
            You should add data and create a project to make predictions.
            Just use the Plus button at the bottom right corner of the app.
            If you don’t have data you can use one of Pinsight’s demo datasets and projects.
        </span>
    </>
);

NoData.propTypes = {
    entity: PropTypes.oneOf(['projects', 'predictions']).isRequired,
};

export default NoData;

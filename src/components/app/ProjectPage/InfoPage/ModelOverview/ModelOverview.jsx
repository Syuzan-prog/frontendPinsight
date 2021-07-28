import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import { MODEL_OVERVIEW_VALUE_MAP } from 'constants/projectPage.constants';

import styles from './ModelOverview.scss';

const ModelOverview = ({ modelOverview: { modelName, ...features } }) => (
    <Paper className={styles.container}>
        <div className={styles.barContainer}>
            <Typography variant="overline" className={styles.paperTitle}>Model Overview</Typography>
        </div>
        <Paper className={styles.innerContainer}>
            <List className={clsx(styles.listBorder, styles.list)}>
                <ListItem className={styles.listItem}>
                    <Typography variant="caption">Model Name</Typography>
                </ListItem>
                {Object.keys(MODEL_OVERVIEW_VALUE_MAP).map((key) => (
                    <ListItem key={`name-${key}`} className={styles.listItem}>
                        <Typography variant="caption" className={styles.greyText}>{key}</Typography>
                    </ListItem>
                ))}
            </List>
            <List className={styles.list}>
                <ListItem className={styles.listItem}>
                    <Typography variant="caption">{modelName}</Typography>
                </ListItem>
                {Object.keys(MODEL_OVERVIEW_VALUE_MAP).map((key) => (
                    <ListItem key={`value=${key}`} className={styles.listItem}>
                        <Typography variant="caption" className={styles.greyText}>{features[MODEL_OVERVIEW_VALUE_MAP[key]]}</Typography>
                    </ListItem>
                ))}
            </List>
        </Paper>
    </Paper>
);

ModelOverview.propTypes = {
    modelOverview: PropTypes.shape({
        modelName: PropTypes.string,
    }),
};

ModelOverview.defaultProps = {
    modelOverview: {},
};

export default ModelOverview;

import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import styles from './DataOverview.scss';

const DataOverview = ({ dataOverview: { includedVariables, excludedVariables } }) => (
    <Paper className={styles.container}>
        <div className={styles.barContainer}>
            <Typography variant="overline" className={styles.paperTitle}>Data Overview</Typography>
        </div>
        <Paper className={styles.innerContainer}>
            <List className={styles.list}>
                <ListItem className={styles.listHeader}>
                    <Typography className={styles.listHeaderText} variant="subtitle2">Excluded Variables</Typography>
                </ListItem>
                {
                    excludedVariables.map((variable) => (
                        <ListItem key={`excluded-${variable}`}>
                            <Typography variant="body2" className={styles.greyText}>{variable}</Typography>
                        </ListItem>
                    ))
                }
            </List>
            <List className={styles.list}>
                <ListItem className={styles.listHeader}>
                    <Typography variant="subtitle2" className={styles.listHeaderText}>Included Variables</Typography>
                </ListItem>
                {
                    includedVariables.map((variable) => (
                        <ListItem key={`included-${variable}`}>
                            <Typography variant="body2" className={styles.greyText}>{variable}</Typography>
                        </ListItem>
                    ))
                }
            </List>
        </Paper>
    </Paper>
);

DataOverview.propTypes = {
    dataOverview: PropTypes.shape({
        includedVariables: PropTypes.arrayOf(PropTypes.string),
        excludedVariables: PropTypes.arrayOf(PropTypes.string),
    }),
};

DataOverview.defaultProps = {
    dataOverview: {
        includedVariables: [],
        excludedVariables: [],
    },
};

export default DataOverview;

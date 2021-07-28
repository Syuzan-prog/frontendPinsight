import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { format } from 'date-and-time';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import styles from './Other.scss';

const Other = ({ data: {
    id, name, type, createdAt,
} }) => (
    <Paper className={styles.container}>
        <div className={styles.barContainer}>
            <Typography variant="overline" className={styles.paperTitle}>
                Other
            </Typography>
        </div>
        <Paper className={styles.innerContainer}>
            <List className={clsx(styles.listBorder, styles.list)}>
                <ListItem>
                    <Typography variant="caption" color="textSecondary">
                        Project Name
                    </Typography>
                </ListItem>
                <ListItem>
                    <Typography variant="caption" color="textSecondary">
                        Project ID
                    </Typography>
                </ListItem>
                <ListItem>
                    <Typography variant="caption" color="textSecondary">
                        Project Type
                    </Typography>
                </ListItem>
                <ListItem>
                    <Typography variant="caption" color="textSecondary">
                        Creation Date
                    </Typography>
                </ListItem>
            </List>
            <List className={styles.list}>
                <ListItem>
                    <Typography variant="caption" color="textSecondary">
                        {name}
                    </Typography>
                </ListItem>
                <ListItem>
                    <Typography variant="caption" color="textSecondary">
                        {id}
                    </Typography>
                </ListItem>
                <ListItem>
                    <Typography variant="caption" color="textSecondary" className="capitalize">
                        {type.toLowerCase()}
                    </Typography>
                </ListItem>
                <ListItem>
                    <Typography variant="caption" color="textSecondary">
                        {format(new Date(createdAt), 'DD.MM.YYYY')}
                    </Typography>
                </ListItem>
            </List>
        </Paper>
    </Paper>
);

Other.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        createdAt: PropTypes.string,
    }),
};

Other.defaultProps = {
    data: {
        type: '',
    },
};

export default Other;
